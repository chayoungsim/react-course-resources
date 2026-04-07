import ProductItem from "@/components/products/Product-item";

type Product = {
    id: string;
    title: string;
    slug: string;
    image: string;
};

type ProductProps = {
    products: Product[];   
}

export default function ProductGrid({products} : ProductProps) {
    return (
        <ul className="product-grid">                             
            {products.map((product) => (
                <li key={product.id}>
                    <ProductItem {...product} />                    
                </li>   
            ))}
        </ul>
    )
}