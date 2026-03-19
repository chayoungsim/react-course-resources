import { useState } from 'react'

const useCounter = (inital = 0, step =1) => {

    const [count, setCount] = useState(inital)

    const increment = () => setCount(c => c + step)
    const decrement = () => setCount(c => c - step)
    const reset = () => setCount(inital)

  return { count, increment, decrement, reset}
}

export default useCounter

