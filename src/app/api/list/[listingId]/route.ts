import prisma from "../../../../libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
              createdAt: 'desc',
            },
        });

        const safeListings = listings.map((listing) => ({
         ...listing,
          createdAt: listing.createdAt.toISOString(),
        }));
        return NextResponse.json(safeListings); // NextResponse.json kullanın
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 }); // Hata durumunda NextResponse.json kullanın
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(
  request: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const { listingId } = await params;  // Changed to await the param

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId,
            },
            include: {
                user: true,
            },
        });

        if (!listing) {
            return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
        }

        return NextResponse.json({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            user: {
                ...listing.user,
                createdAt: listing.user.createdAt.toISOString(),
                updatedAt: listing.user.updatedAt.toISOString(),
                emailVerified: listing.user.emailVerified?.toISOString() || null,
            },
        });
    } catch (error) {
        console.error("Listing API error:", error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}