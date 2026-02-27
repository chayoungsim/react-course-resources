import { useState } from 'react'

const Player = ({initPlayerName, symbol}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initPlayerName);

  const handleClick = () => {
    setIsEditing((isEditing) => !isEditing);
  }

  const handleChange = (event) => {
    setPlayerName(event.target.value)
  }
  
 let editPlayerName = <span className="player-name">{playerName}</span>;
 if(isEditing) {
    editPlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
 }

  return (
    <li>
        <span className="player">
            {editPlayerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  )
}

export default Player