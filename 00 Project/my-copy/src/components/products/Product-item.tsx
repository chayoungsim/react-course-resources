
import Image from "next/image";
import Link from "next/link";

type ProductItemProps = {
    id:string;
    title: string;
    slug: string;
    image: string;
}

export default function ProductItem({title, slug, image}:ProductItemProps) {
    return (
        <div className="product-item">
            <Link href={`/products/${slug}`}>
                <div className="product-thumb">
                    {image && <Image src={image} alt={title} fill />}
                </div>
                <div className="product-title">
                    <h3>{title}</h3>
                </div>
            </Link>
        </div>
    )
}