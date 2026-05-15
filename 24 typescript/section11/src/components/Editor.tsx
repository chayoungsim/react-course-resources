
import { useState } from "react";

interface Props {
    onClickAdd: (text:string) => void;
}

const Editor = (props:Props) => {

    const [text, setText] = useState<string>("");
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const onClickButton = () => {
        props.onClickAdd(text);
        setText("");
    }


  return (
    <div>
        <input type="text" value={text} onChange={onChangeInput} />
        <button onClick={onClickButton}>추가</button>
    </div>
  )
}

export default Editor