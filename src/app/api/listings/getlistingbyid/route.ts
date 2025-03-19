import prisma from "@app/../../src/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export async function POST(
    params: IParams,
) {
    try {
        const { listingId } = params;

        if (!listingId || typeof listingId !== 'string') {
            throw new Error('Invalid ID');
        }

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true,
            },
        });

        if(!listing){
            return null;
        }
        
        return NextResponse.json(listing);
    } catch (error) {
        
    }
    
}