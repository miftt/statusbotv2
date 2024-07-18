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