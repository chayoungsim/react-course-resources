import { useState, useRef } from 'react';

const initialItems = [
  { id: 1, name: 'React 공식 문서 읽기', tag: '공부' },
  { id: 2, name: '러닝 30분',            tag: '운동' },
  { id: 3, name: '기타 코드 연습',       tag: '취미' },
]


const Items = () => {
    const [items, setItems] = useState(initialItems);
    const [input, setInput] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('')

    let nextId = useRef(4);

    function handleAdd() {
        if(!input.trim()) return;
        setItems([...items,{id:nextId.current++, name: input, tag:'공부'}])
        setInput('')
    }

    function handleDelete(id) {
        setItems(items.filter(item => item.id !== id))
    }

    function handleEditStart(id, name) {
        setEditingId(id)
        setEditValue(name)
    }

    function handleEditSave(id) {
        setItems(items.map(item => item.id === id ? {...item, name: editValue} : item))
        setEditingId(null)
        setEditValue('')
    }

  return (
    <div>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        <button type='button' onClick={handleAdd}>추가</button>

        {items.map(item =>(
            <div key={item.id}>
                { editingId === item.id 
                ? <input value={editValue}  onChange={e => setEditValue(e.target.value)}/> 
                : <span>{item.name}</span>}   
                <span>{item.tag}</span>              
                <button onClick={() => handleDelete(item.id)}>삭제</button>
                {
                    editingId === item.id
                    ? <button onClick={() => handleEditSave(item.id) }>저장</button>
                    : <button onClick={() => handleEditStart(item.id, item.name)}>수정</button>
                }
                
            </div>
        ))}
    </div>
  )
}

export default Items