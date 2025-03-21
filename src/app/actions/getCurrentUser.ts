import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]";
import prisma from "../../libs/prismadb";

export async function getSession(){
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(){
    try{
        const session = await getSession();
        //console.log(session);
        if(!session?.user?.email){
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            }
        });

        if(!currentUser){
            return null;
        }

        return currentUser;
    }catch(error: any){
        return null;
    }
}

