import { useState, useEffect } from "react";
import axios from "axios";
import { SafeListing } from "@/app/types";

interface UseGetListingsPageResult {
    listings: SafeListing[];
    loading: boolean;
    error: Error | null;
}

const useGetListingsPage = (): UseGetListingsPageResult => {
    const [listings, setListings] = useState<SafeListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/listings');
                setListings(response.data);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error occurred'));
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { listings, loading, error };
};

export default useGetListingsPage;