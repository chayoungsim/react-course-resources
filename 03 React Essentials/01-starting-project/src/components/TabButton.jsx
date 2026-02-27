import React from 'react'

const TabButton = ({children, onSelect, isSelected}) => {
  return (
    <li><button type="button" className={isSelected ? "active" : ""} onClick={onSelect}>{children}</button></li>
  )
}

export default TabButton