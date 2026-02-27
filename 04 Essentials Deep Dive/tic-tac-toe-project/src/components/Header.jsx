import React from 'react'
import logoImg from '../assets/game-logo.png'

const Header = () => {
  return (
    <header>
        <img src={logoImg} alt="react tic-tac-toe" />
        <h1>React Tic-Tac-Toe</h1>
    </header>
  )
}

export default Header