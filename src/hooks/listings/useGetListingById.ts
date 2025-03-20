import { useState, useEffect } from "react";
import axios from "axios";
import { SafeListing } from "@/app/types";

interface UseGetListingByIdResult {
    listingData: SafeListing | null;
    loading: boolean;
    error: Error | null;
}

const useGetListingById = (listingId: string): UseGetListingByIdResult => {
    const [listingData, setListingData] = useState<SafeListing | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post(`/api/list/${listingId}`);
                setListingData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error occurred'));
                setLoading(false);
            }
        }

        if (listingId) {
            fetchData();
        }
    }, [listingId]);

    return { listingData, loading, error };
};

export default useGetListingById;