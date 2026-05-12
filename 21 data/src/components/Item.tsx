
export interface Transaction {
    id: number;
    name: string;
    category: string;
    date: string;
    amount: number;
    type: string;
}

interface ItemProps extends Pick<Transaction, 'name' | 'amount' | 'type'> {
    date: Date;
}

function Item({ name, amount, date, type }: ItemProps) {
  return (
    <div className="item">
        <div className="item-info">
            <span>{name}</span>
            <span>{amount}</span>
        </div>      
        <span className="item-date">{date.toLocaleDateString()}</span>
        <span className={`item-type ${type}`}>{type}</span> 
    </div>
  )
}   
export default Item