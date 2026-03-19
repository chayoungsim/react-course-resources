import { useState, useEffect } from "react";
import axios from "axios";

import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

export default function AvailablePlaces({ onSelectPlace }) {
    const [isFetching, setIsFetching] = useState(false);
    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchPlaces() {
            setIsFetching(true);

            try {
                const response = await axios.get("http://localhost:3000/places");
                const places = response.data.places;

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const sortedPlaces = sortPlacesByDistance(
                            places, // 응답 객체에서 'places' 배열을 사용합니다.
                            position.coords.latitude,
                            position.coords.longitude,
                        );
                        setAvailablePlaces(sortedPlaces);
                        setIsFetching(false);
                    },
                    (error) => {
                        // 위치 정보 접근 실패 또는 거부 시 처리
                        console.error("Geolocation error:", error);
                        setAvailablePlaces(places); // 정렬되지 않은 목록으로 상태 업데이트
                        setIsFetching(false);
                    },
                );
            } catch (error) {
                setError({
                    message: error.message || "Could not fetch places, please try again later.",
                });
                setIsFetching(false);
            }
        }

        fetchPlaces();
    }, []);

    if (error) {
        return <Error title="An error occurred!" message={error.message} />;
    }

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isFetching}
            loadingText="Fetching place data..."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
