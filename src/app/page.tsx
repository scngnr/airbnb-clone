"use client";
import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import i18n from "../components/language/i18n";
import { useTranslation } from "react-i18next";
import EmptyState from "@/components/EmptyState";
import {  useEffect, useState } from "react";
import { Listing } from "@prisma/client";
import axios from "axios";
import ListingCard from "@/components/listings/ListingCard";
import { useUserContext } from "./_context/UserContext";

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const { t, i18n: { language } } = useTranslation(); 
  const {currentUser } = useUserContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/listings');
        setListings(response.data);
      } catch (error) {
        console.error('Veri alınırken hata oluştu:', error);
      }
    }

    fetchData();
  }, [listings] ); 

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