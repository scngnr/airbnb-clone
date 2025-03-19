import { NextResponse } from "next/server";

import prisma from "../../../libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

// GET fonksiyonunu GET olarak adlandırın
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

export async function POST(request: Request){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        location,
        price,
    } = body;

    const listing = await prisma.listing.create({
        data: {
            title: title,
            description: description,
            imageSrc: imageSrc,
            category: category,
            roomCount: roomCount,
            bathroomCount: bathroomCount,
            guestCount: guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id,
        }
    });

    return NextResponse.json(listing);
}