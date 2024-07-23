import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function getUserSession() {
    const session = await getServerSession(authOptions)
    return session
}