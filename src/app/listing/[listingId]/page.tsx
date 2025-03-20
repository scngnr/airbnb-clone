"use client";

import { useParams } from "next/navigation";
import useGetListingById from "@/hooks/listings/useGetListingById";
import ClientOnly from "@/components/ClientOnly";
import EmptyState from "@/components/EmptyState";
import { useUserContext } from "@/app/_context/UserContext";
import ListingClient from "./ListingClient";

const ListingPage = () => {
    const params = useParams();
    const {currentUser } = useUserContext();

    const { listingData, loading, error } = useGetListingById(params.listingId as string);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!listingData) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ListingClient listing={listingData} currentUser={currentUser} />
        </ClientOnly>
    );
};

export default ListingPage;