import { useMemo } from "react";
import { Reservation } from "@prisma/client";
import { SafeListing, SafeUser } from "@/app/types";
import { categories } from "@/components/Navbar/Categories/Categories";
import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";


interface ListingClientProps {
    reservations?:Reservation[];
    listing:SafeListing & {
        user: SafeUser;
    }
    currentUser?:SafeUser | null;
}

const ListingClient = ({
    reservations,
    listing,
    currentUser,
}:ListingClientProps) => {

    const category = useMemo(() => {
        return categories.find((category) => category.label === listing.category);
    }, [listing.category]);
    
    return ( 
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue} 
                        id={listing.id} 
                        currentUser={currentUser} 
                    />
                </div>

            </div>
        </Container>
     );
}
 
export default ListingClient;