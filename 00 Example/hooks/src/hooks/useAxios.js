import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../api/axiosInstance";

export function useAxios(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [trigger, setTrigger] = useState(0);

    const refetch = () => setTrigger((t) => t + 1);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();
        setLoading(true);
        setError(null);

        axiosInstance({ url, signal: controller.signal, ...options })
            .then((res) => setData(res.data))
            .catch((err) => {
                if (axios.isCancel(err)) return;
                setError(
                    err.response
                        ? `${err.response.status}: ${err.response.data?.message || err.message}`
                        : err.message,
                );
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            controller.abort();
        };
    }, [url, trigger]);

    return { data, loading, error, refetch, setData };
}
