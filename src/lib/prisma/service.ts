import { prisma } from "@/lib/prisma/prisma";
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';

export async function login(data: {username: string}){
    const usernameInput = data.username.toLocaleLowerCase();
    const user = await prisma.user.findUnique({
        where: {
            username: usernameInput
        },
    });
    if (user){
        return user;
    }else if(user === data.username ){
        return user;
    }else {
        return null;
    }
}

export async function register(
    data: {
        id: string,
        username: string,
        password: string,
        status: string,
        role: string,
    },
    ){
    const user = await prisma.user.findUnique({
        where: {
            username: data.username,
        },
    })
    if(user){
        return {status: false, statusCode: 400, message: "Username already exists"}
    }else{
        data.id = uuidv4();
        data.password = await bcrypt.hash(data.password, 10);
        data.username = data.username;
        data.status = 'Online';
        data.role = 'user';

        try{
            const createUser = await prisma.user.create({
                data: data
            })
            return {status: true, statusCode: 200, message: 'User created successfully', data: createUser};
        }catch(error){
            return {status: false, statusCode: 400, message: 'Register Failed', data: error};
        }
    }
}

export async function changePassword(userId: string, newPassword: string, oldPassword: string) {
    const checkOldPassword = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            password: true
        }
    })
    const checkedOldPassword = checkOldPassword?.password as string;
    const passwordConfirm = await bcrypt.compare(oldPassword, checkedOldPassword)
    if(passwordConfirm === false){
        return {status: false, statusCode: 400, message: 'Wrong old password'}
    }else{
        const updatePassword = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: await bcrypt.hash(newPassword, 10),
            }
        })
        return {status: true, statusCode: 200, message: 'Password changed successfully', data: updatePassword};
    }
}

export async function getAllUser(){
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            role: true,
            status: true,
            token:{
                select:{
                    token: true
                }
            },
            created_at: true,
            expireDate: true
        }
    });
    return {
        status: true,
        statusCode: 200,
        message: 'Users found',
        data: users
    };
}

export async function getToken(userId: string){
    const token = await prisma.token.findUnique({
        where: {
            userId: userId
        },
        select: {
            token: true
        }
    })
    if(token){
        return {
            status: true,
            statusCode: 200,
            message: 'Token found',
            data: token
        };
    }else{
        return null;
    }
}

export async function getStatusBotPublicAPI(userId: string, token: string){
    const user = await prisma.user.findUnique({
        select:{
            id: true,
            status_bot: true,
            token: {
                select: {
                    token: true
                }
            }
        },
        where:{
            id: userId,
            token: {
                token: token
            }
        }
    })
    if(token !== user?.token?.token){
        return 'Wrong Token!';
    }else if(user){
        return user?.status_bot;
    }else {
        return 'User not found!';
    }

}
