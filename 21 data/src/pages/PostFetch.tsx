import { useState, useEffect } from 'react';
import Item from '../components/Item';
import type { Transaction } from '../components/Item';


const PostFetch = () => {
    const [items, setItems] = useState<Transaction[]>([]);
    useEffect(() =>{
        fetch('http://localhost:3002/transactions')
        .then(response => response.json())
        .then(data => setItems(data))
        .catch(error => console.error('Error fetching data:', error));
    },[]);

  return (
    <div>
        {items.map((item: Transaction, index) => (
            <Item key={index} name={item.name} amount={item.amount} date={new Date(item.date)} />
        ))}        
    </div>
  )
}

export default PostFetch