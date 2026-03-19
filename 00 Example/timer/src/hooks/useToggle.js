import { useState } from 'react'

const useToggle = (initial = false) => {
    const [on, setOn] = useState(initial)

    const toggle = () => setOn(v => !v)
    const turnOn = () => setOn(true)
    const turnOff = () => setOn(false)


  return {on, toggle, turnOn, turnOff}
}

export default useToggle