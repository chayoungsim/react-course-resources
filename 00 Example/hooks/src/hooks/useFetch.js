import { useState, useEffect } from "react";
import axios from "axios";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [trigger, setTrigger] = useState(0);

    const refetch = () => setTrigger((t) => t + 1); //클릭시 재요청 발동

    useEffect(() => {
        if (!url) return;

        // AbortController를 사용하여 요청 취소 로직 구현
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setData(null);

            try {
                // axios.get을 사용하고, signal을 전달하여 요청을 취소할 수 있도록 함
                const response = await axios.get(url, {
                    signal: controller.signal,
                });
                // axios는 응답 데이터를 자동으로 JSON 파싱하여 data 속성에 담아줌
                setData(response.data);
            } catch (err) {
                // 요청이 취소된 경우 에러 상태를 업데이트하지 않음
                if (axios.isCancel(err)) {
                    console.log("Request canceled:", err.message);
                    return;
                }
                // 그 외의 에러는 상태에 저장
                setError(err.message);
            } finally {
                // 로딩 상태 종료
                setLoading(false);
            }
        };

        fetchData();

        // cleanup 함수: 컴포넌트가 언마운트되거나 url, trigger가 변경될 때 이전 요청을 취소
        return () => {
            controller.abort();
        };
    }, [url, trigger]);

    return { data, loading, error, refetch };
}
