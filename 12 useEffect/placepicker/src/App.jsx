import { useRef, useState } from "react";

import Places from './components/Places';
import { AVAILABLE_PLACES } from './data'
import logoImg from "./assets/logo.png";
import Modal from './components/Modal'
import DeleteConfirmation from './components/DeleteConfirmation'

function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  // 장소를 클릭하거나 선택했을때
  // 해당 장소 id를 받아서
  // pickedPlaces 상태에 추가하는 역할
  // 선택한 장소 목록을 관리하는 함수
  function handleSelectPlace(id) {

    //prevPickedPlaces = 현재 선택된 장소 목록
    setPickedPlaces((prevPickedPlaces) => {
      //이미 선택된 장소인지 확인
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;  // 기존상태 그대로 반환한다
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];  // 새 배열을 만들어 반환한다. [새로운장소, 기존 장소들] //항상 맨 앞에 추가됩니다.
    });
  }

 
// 삭제 버튼을 클릭
// 특정 장소를 선택 목록에서 제거

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current) // 선택된 id와 다른 장소만 남긴다. //selectedPlace.current 삭제대상id
    );
    modal.current.close();
  }
  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  )
}

export default App
