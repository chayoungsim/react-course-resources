import axios from "axios"
import { useState, useEffect } from "react"
import Item from "../components/Item"
import type { Transaction } from "../components/Item";

const PostAxios = () => {
  const [items, setItems] = useState<Transaction[]>([]);

//   useEffect(() => {
//     axios.get('http://localhost:3002/transactions')
//       .then(response => setItems(response.data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3002/transactions');
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    },[])


  return (
    <div>
      {items.map((item: Transaction, index) => (
            <Item key={index} name={item.name} amount={item.amount} date={new Date(item.date)} />
        ))}
    </div>
  )
}

export default PostAxios