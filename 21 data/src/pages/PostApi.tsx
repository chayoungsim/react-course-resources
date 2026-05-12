import api from '../api/api'
import { useState, useEffect } from 'react'
import Item, { type Transaction } from '../components/Item'

const PostApi = () => {
    const [items, setItems] = useState<Transaction[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {   
                const response = await api.get('/transactions');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


  return (
    <div>        
        <div>
            {items.map((item: Transaction, index) => (
                <Item key={index} name={item.name} amount={item.amount} date={new Date(item.date)} type={item.type} />
            ))}
        </div>
    </div>
  )
}

export default PostApi