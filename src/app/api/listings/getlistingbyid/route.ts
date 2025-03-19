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

        if (!listing) {
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null,
            },
        };
    } catch (error) {
        throw new Error('Invalid ID');
    }

}