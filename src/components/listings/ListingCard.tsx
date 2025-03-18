"use client";
import { Listing, Reservation, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useCountries from "@/hooks/useCountries";
import { useCallback, useMemo } from "react";
import { format } from "date-fns/format";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import HeartButton from "../HeartButton";

interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: User | null;
}

const ListingCard = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser,
}: ListingCardProps) => {

    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(data.id);
        }, [data, disabled, onAction]
    );

    const { i18n } = useTranslation();

    const price = useMemo(() => {
        const amount = reservation ? reservation.totalPrice : data.price;
        return new Intl.NumberFormat(i18n.language, {
            style: 'currency',
            currency: i18n.language === 'tr' ? 'TRY' : 'USD'
        }).format(amount);
    }, [data.price, reservation, i18n.language]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, "dd MMMM yy")} - ${format(end, "dd MMMM yy")}`;
    }, [reservation]);

    return (
        <div
            onClick={() => router.push(`/listing/${data.id}`)}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        fill
                        alt="Listing"
                        src={data.imageSrc}
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top3 right-3">
                        <HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        {price}
                    </div>
                    {reservation && (
                        <div className="font-ligt">night</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListingCard;