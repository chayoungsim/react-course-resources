import axios from 'axios';


const form = document.querySelector('.form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

// API 응답 결과에 대한 인터페이스 정의
interface GeocodingResponse {
    results: {
        geometry: {
            location: {
                lat: number;
                lng: number;
            }
        }
    }[];
    status: 'OK' | 'ZERO_RESULTS';
}


function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    
    // Webpack을 통해 주입된 환경 변수 사용
    axios.get<GeocodingResponse>('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: enteredAddress,
                key: process.env.GOOGLE_API_KEY
            }
        }
    )
        .then(response => {
            if (response.data.status !== 'OK') {
                throw new Error('Could not fetch location!');
            }
            const coordinates = response.data.results[0].geometry.location;
            console.log(coordinates);
        })
        .catch(err => {
            alert(err.message);
            console.error(err);
        })
}

form.addEventListener('submit', searchAddressHandler)
