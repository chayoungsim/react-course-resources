import { useRef, useState } from 'react'

const Timer = () => {
 const [seconds, setSeconds] = useState(0)

 const timerId = useRef(null);

 const start = () => {
    timerId.current = setInterval(() => {
        setSeconds(prev => prev + 1)
    },1000)
 }

 const stop = () => {
    clearInterval(timerId.current)
 }

  return (
    <div>
        <p>시간 : {seconds}초</p>
        <button onClick={start}>시작</button>
        <button onClick={stop}>정지</button>
    </div>
  )
}

export default Timer