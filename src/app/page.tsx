"use client";

import Container from "@/components/Container";
import i18n from "../components/language/i18n";
import { useTranslation } from "react-i18next";
import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import { useUserContext } from "./_context/UserContext";
import ListingCard from "@/components/listings/ListingCard";
import useGetListingsPage from "@/hooks/listings/useGetListingsPage";

export default function Home() {
  const { t, i18n: { language } } = useTranslation(); 

  const {currentUser } = useUserContext();
  
  const { listings, loading, error } = useGetListingsPage();

  if (loading) {
    return (
      <ClientOnly>
        <EmptyState
          title="Loading..."
          subtitle="Please wait while we fetch the listings"
        />
      </ClientOnly>
    );
  }

  if (error) {
    return (
      <ClientOnly>
        <EmptyState
          title="Error"
          subtitle="An error occurred while fetching listings"
        />
      </ClientOnly>
    );
  }

  if (!language) {
    return null;
  }

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}