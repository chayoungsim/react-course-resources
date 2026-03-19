import Places from "./Places";
import { sortPlacesByDistance } from "../loc";
import { fetchAvailablePlaces } from "../http";
import { useFetch } from "../hooks/useFetch";

async function fetchSortedPlaces() {
    const places = await fetchAvailablePlaces();

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const sortedPlaces = sortPlacesByDistance(
                    places,
                    position.coords.latitude,
                    position.coords.longitude,
                );
                resolve(sortedPlaces);
            },
            (error) => {
                // 위치 정보 접근 실패 또는 거부 시 처리
                console.error("Geolocation error:", error);
                resolve(places); // 정렬되지 않은 목록으로 resolve
            },
        );
    });
}

const AvailablePlaces = ({ onSelectPlace }) => {
    const { isFetching, error, fetchedData: availablePlaces } = useFetch(fetchSortedPlaces, []);

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <div>
            <Places
                title="Available Places"
                loadingText="Fetching place data..."
                fallbackText="No places available."
                places={availablePlaces}
                isLoading={isFetching}
                onSelectPlace={onSelectPlace}
            />
        </div>
    );
};

export default AvailablePlaces;
