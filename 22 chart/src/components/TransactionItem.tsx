export interface Transaction {
    id: number;
    description: string;
    category: string;
    date: string;
    amount: number;
    type: string;
}

interface ItemProps extends Pick<Transaction,'description' |'amount' | 'type'> {
    date: string;
}

function TransactionItem({description, amount, date, type}:ItemProps) {
  return (
    <div className="item">
        <div className="item-info">            
            <span>{description}</span>
            <span>{date}</span>
        </div>
        <div className="item-side">
            <span>{amount}</span>
            <span>{type}</span>
        </div>
    </div>
  )
}

export default TransactionItem