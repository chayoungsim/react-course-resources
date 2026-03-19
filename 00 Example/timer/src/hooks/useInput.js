import { useState } from 'react'

const useInput = (initial = '') => {

    const [value, setValue] = useState(initial)

    const onChange = e => setValue(e.target.value)
    const clear = () => setValue('')

  return { value, onChange, clear}
}

export default useInput