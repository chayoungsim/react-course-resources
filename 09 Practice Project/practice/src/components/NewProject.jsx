import { useRef } from 'react'
import Input from './Input'
import Modal from './Modal';

// 1. 입력된값을 수집한다. useRef
// 2. 저장 버튼 클릭시 실행함수 연결
// 3. handleSave()
// 4. ref에 접근해서 current.value 값을 가져오기
// 5. 유효성 검사 추가하고

// 6. 데이터를 앱 컴포너트에 전달


const NewProject = ({onAdd, onCancel}) => {

    const modal = useRef();

    const title = useRef();
    const description = useRef();
    const dueDate = useRef();

    const handleSave = () => {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        if(
            enteredTitle.trim() ==='' ||
            enteredDescription.trim() === '' ||
            enteredDueDate.trim() === ''
        ) {
            //경고모달오픈
            modal.current.open();
            return;
        }

        onAdd({
            title:enteredTitle,
            description:enteredDescription,
            dueDate:enteredDueDate
        })
    }

    return (
        <>
            <Modal ref={modal} buttonCaption="Okay">
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">
                Oops ... looks like you forgot to enter a value.
                </p>
                <p className="text-stone-600 mb-4">
                Please make sure you provide a valid value for every input field.
                </p>
            </Modal>
            <div className="w-140 mt-16">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button 
                            className="text-stone-800 hover:text-stone-950"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button 
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input type="text" ref={title} label="Title" />
                    <Input ref={description} label="Description" textarea />
                    <Input type="date" ref={dueDate} label="Due Date" />            
                </div>
            </div>
        </>
    )
}

export default NewProject