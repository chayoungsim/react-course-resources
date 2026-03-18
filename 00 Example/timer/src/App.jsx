import { useState, useEffect } from 'react'

function App() {

    const [seconds, setSeconds] = useState(10)
    const [running, setRunning] = useState(false)


    useEffect(() => {
        if(!running) return;

        const id = setInterval(() => {
            setSeconds(prev => {
                if(prev <= 1) {
                    setRunning(false); 
                    return 0
                }
                return prev-1
            }) 
        },1000)

        return () => {
            clearInterval(id)
            console.log('타이머 정리 완료')
        }

    },[running])


  const mm = String(Math.floor(seconds / 60)).padStart(2,0);
  const ss = String(seconds % 60).padStart(2,0)

  return (
    <>
      <h1>{mm} : {ss}</h1>
      <button onClick={() => setRunning(r => !r)}>
        {running ? '⏸ 일시정지' : '▶ 시작'}
      </button>
      <button onClick={() => {setRunning(false); setSeconds(0)}}>
        ↺ 리셋
      </button>
    </>
  )
}

export default App
