import { useState } from 'react'

const useLocalStorage = (key, initial) => {

    const stored = localStorage.getItem(key)
    const [value, setValue] = useState(() => stored ? JSON.parse(stored) : initial)

    function set(newVal) {
        setValue(newVal)
        localStorage.setItem(key, JSON.stringify(newVal))
    }

  return [value, set]
}

export default useLocalStorage