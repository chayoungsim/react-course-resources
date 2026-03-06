import React from 'react'
import logoImg from '../assets/investment-calculator-logo.png'

const Header = () => {
  return (
    <header id="header">
        <img src={logoImg} alt="Logo showing a meoney bag" />
        <h1>            
            Investment Calculator
        </h1>
    </header>
  )
}

export default Header