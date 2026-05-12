import api from "../api/api";
import { useState, useEffect } from "react";
import Item, { type Transaction } from "../components/Item";

const PostApiFilterGroup = () => {
  const [items, setItems] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<string>("all"); // 'all' | 'income' | 'expense'

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

  const filteredData = items.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  // 날짜(YYYY-MM-DD) 기준으로 그룹핑 후 최신순 정렬
  const groupedByDate = filteredData.reduce<Record<string, Transaction[]>>((acc, item) => {
    const dateKey = item.date.slice(0, 10);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a));

  return (
    <div>
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>전체</button>
        <button onClick={() => setFilter("income")}>수입</button>
        <button onClick={() => setFilter("expense")}>지출</button>
      </div>
      <div>
        {sortedDates.map((dateKey) => (
          <div key={dateKey}>
            <h3>{dateKey}</h3>
            {groupedByDate[dateKey].map((item) => (
              <Item
                key={item.id}
                name={item.name}
                amount={item.amount}
                date={new Date(item.date)}
                type={item.type}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostApiFilterGroup;
