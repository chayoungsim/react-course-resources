import useCounter from '../hooks/useCounter.js'
import useInput from '../hooks/useInput.js'
import useToggle from '../hooks/useToggle.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { useState } from 'react'

const Counters = () => {
    const [items, setItems] = useState([])
    const [name, setName] = useLocalStorage('username','')
    const { count, increment, decrement, reset } = useCounter(0,1)    
    const darkMode = useToggle(false)

    function handleAdd() {
        setItems([...items,{name:name}])
        setName('')
    }

  return (
    <div>
        <p>{count}</p>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>reset</button>

        <br />
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="이름" />
        <button onClick={handleAdd}>추가</button>

        <ul>
            {items.map((item,index) => (
                <li key={index}>{item.name}</li>
            ))}
        </ul>

        <br />
        <button onClick={darkMode.toggle}>
            {darkMode.on ? '🌙 다크' : '☀️ 라이트'}
        </button>
    </div>
  )
}

export default Counters
