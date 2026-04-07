

export default function SubContainer({ children }: { children: React.ReactNode }) {

    return (      
        <div className="contents">
            {children}  
        </div>   
    )
}