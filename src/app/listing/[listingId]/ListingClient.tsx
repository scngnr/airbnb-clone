import { useCallback, useEffect, useMemo, useState } from "react";
import { Reservation } from "@prisma/client";
import Container from "@/components/Container";
import { SafeListing, SafeUser } from "@/app/types";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingHead from "@/components/listings/ListingHead";
import { categories } from "@/components/Navbar/Categories/Categories";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval, set } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "@/components/listings/ListingsReservation";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

interface ListingClientProps {
    reservations?:Reservation[];
    listing:SafeListing & {
        user: SafeUser;
    }
    currentUser?:SafeUser | null;
}

const ListingClient = ({
    reservations = [],
    listing,
    currentUser,
}:ListingClientProps) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() =>{
        let dates: Date[] = [];
        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });

            dates = [...dates, ...range];
        })

        return dates;
    }, [reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState(initialDateRange);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            listingId: listing.id,
            userId: currentUser.id,
            startDate: dateRange.startDate, 
            endDate: dateRange.endDate,
            totalPrice: totalPrice,
        })
        .then(()=>{
            toast.success('Reservation created!');
            //router.push(`/reservations/${listing.id}`);
            setDateRange(initialDateRange);
            router.refresh();
        })
        .catch((error)=>{
            toast.error('Something went wrong!');
            console.log(error);
        })
        .finally(()=>{
            setIsLoading(false);
        });

    },[currentUser, dateRange, listing?.id, loginModal, router]);

    useEffect(() => {
       if(dateRange.startDate && dateRange.endDate){
          const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate); 
          if(dayCount && listing?.price){
            setTotalPrice(dayCount * listing.price);
          }else{
            setTotalPrice(listing.price);
          }
       }
       
    }, [dateRange, listing?.price])

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
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />

                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </Container>
     );
}
 
export default ListingClient;