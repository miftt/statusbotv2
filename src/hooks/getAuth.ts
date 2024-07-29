import { authOptions } from "@/lib/authOptions/authOptions";
import { getServerSession } from "next-auth";
import { NextAuthSession } from "@/types/next-auth";

export const getAuth = async (): Promise<NextAuthSession | null> => {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      // Verifikasi bahwa sesi memiliki informasi yang diharapkan
      if (session.user.username) {
        return session as NextAuthSession;
      } else {
        console.error("Session is missing user information:", session);
        return null;
      }
    } else {
      console.error("No session found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}
