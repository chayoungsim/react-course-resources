

const Cards = ({title, data, loading, error}) => {
    
    return (
        <section className="places-category">
            <h2>{title}</h2>
            {loading && <p>로딩 중입니다...</p>}
            {error && <p>에러 : {error}</p>}            
            <ul className="places">
                {data &&
                    data.places.map((item) => (
                        <li key={item.id} className="place-item">
                            <img src={`http://localhost:3000/${item.image.src}`} alt={item.image.alt} />
                        </li>
                    ))}
            </ul>
        </section>
    )
}

export default Cards