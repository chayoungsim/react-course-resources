import React from 'react'
import usePhoneBookStore from '../stores/usePhoneBookStore'

const ContactList = () => {
    const { phoneBook } = usePhoneBookStore(); 
  return (
    <div>
        <ul>
            {phoneBook.map((item) => (
                <li key={item.id}>
                    <span>{item.name}</span>
                    <span>{item.phoneNumber}</span>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default ContactList