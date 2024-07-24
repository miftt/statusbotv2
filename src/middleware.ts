import withAuth from "./middlewares/withAuth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function mainMiddleware(request: NextRequest) {
    const res = NextResponse.next();
    return res;
}

export default withAuth(mainMiddleware, ['/', '/dashboard', '/settings','/settings/profile','/settings/security', '/login', '/register', '/itemlist', '/profile', '/admin/dashboard']);