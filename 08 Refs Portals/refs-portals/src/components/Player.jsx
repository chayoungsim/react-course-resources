import { useState } from 'react'


const Player = () => {

    const [playeredName, setPlayeredName] = useState("");
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (event) => {
        setSubmitted(false);
        setPlayeredName(event.target.value)
    }

    const handleClick = () => {
        setSubmitted(true)
    }


    return (
        <section id="player">
            <h2>Welcome {submitted ? playeredName : 'unknown entity'}</h2>
            <p>
                <input type="text" onChange={handleChange} value={playeredName} />
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    )
}

export default Player