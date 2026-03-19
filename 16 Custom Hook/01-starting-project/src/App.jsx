import { useEffect, useState } from "react";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import Places from "./components/Places.jsx";
import { fetchUserPlaces, updateUserPlaces } from "./http.js";
import Error from "./components/Error.jsx";

function App() {
    const [userPlaces, setUserPlaces] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchPlaces() {
            setIsFetching(true);
            const places = await fetchUserPlaces();
            setUserPlaces(places);
            setIsFetching(false);
        }
        fetchPlaces();
    }, []);

    function handleSelectPlace(selectedPlace) {
        setUserPlaces((prevPickedPlaces) => {
            if (!prevPickedPlaces) {
                prevPickedPlaces = [];
            }
            if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
                return prevPickedPlaces;
            }
            return [selectedPlace, ...prevPickedPlaces];
        });
    }

    return (
        <>
            <header>
                <img src={logoImg} alt="Stylized globe" />
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to visit or you have
                    visited.
                </p>
            </header>
            <main>
                {error && <Error title="An error occurred!" message={error.message} />}
                {!error && (
                    <Places
                        title="I'd like to visit ..."
                        fallbackText="Select the places you would like to visit below."
                        isLoading={isFetching}
                        loadingText="Fetching your places..."
                        places={userPlaces}
                    />
                )}
                <AvailablePlaces onSelectPlace={handleSelectPlace} />
            </main>
        </>
    );
}

export default App;
