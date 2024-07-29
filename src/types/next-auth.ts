// types/next-auth.ts
import { DefaultSession } from "next-auth";

export interface NextAuthSession extends DefaultSession {
  user: {
    id: string;
    email: string;
    username?: string;
    role?: string;
    // Tambahkan properti lain yang Anda butuhkan dari sesi
  }
}
