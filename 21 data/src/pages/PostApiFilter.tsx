import api from "../api/api";
import { useState, useEffect } from "react";
import Item, { type Transaction } from "../components/Item";

const PostApi = () => {
  const [items, setItems] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<string>("all");// 'all' | 'income' | 'expense'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/transactions");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // 실제 화면에 그려줄 필터링된 데이터
  const filteredData = items.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });



  return (
    <div>
        <div className="filter-buttons">
            <button onClick={() => setFilter('all')}>전체</button>
            <button onClick={() => setFilter('income')}>수입</button>
            <button onClick={() => setFilter('expense')}>지출</button>
        </div>
        <div>
            {filteredData.map((item: Transaction, index) => (
                <Item
                    key={index}
                    name={item.name}
                    amount={item.amount}
                    date={new Date(item.date)}
                    type={item.type}
                />
            ))}
        </div>
    </div>
  );
};

export default PostApi;
