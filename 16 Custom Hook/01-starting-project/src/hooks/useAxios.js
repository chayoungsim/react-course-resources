import axiosInstance from "../api/axiosInstance";
import { useState, useEffect } from "react";

export function useAxios(url, options={}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        setLoading(true)
        setError(null)

        axiosInstance({url, ...options})
        .then(res => setData(res.data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))

    }, [url]);

    return { data, loading, error };
}
