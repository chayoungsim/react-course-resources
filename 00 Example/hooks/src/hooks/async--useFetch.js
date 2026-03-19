import { useState, useEffect } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [trigger, setTrigger] = useState(0);

    const refetch = () => setTrigger((t) => t + 1); //클릭시 재요청 발동

    useEffect(() => {
        if (!url) return;

        let cancelled = false;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setData(null);

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                const json = await response.json();
                if (!cancelled) {
                    setData(json);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            cancelled = true;
        };
    }, [url, trigger]);

    return { data, loading, error, refetch };
}
