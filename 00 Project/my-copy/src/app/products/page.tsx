import SubContainer from "@/components/layout/SubContainer";
import SubVisual from "@/components/layout/SubVisual";
import ProductGrid from "@/components/products/Product-grid";
import ProductItem from "@/components/products/Product-item";

type Product = {
    id: string;
    title: string;
    slug: string;
    image: string;
};

const PRODUCTS: Product[] = [
    {
        id: "1",
        title: "Collaborative Robot",
        slug: "collaborative-robot",
        image: "/assets/images/Category3DCover_Name3D350.jpg",
    },
    {
        id: "2",
        title: "Mobile Robot",
        slug: "mobile-robot",
        image: "/assets/images/Category3DCover_Name3D350.jpg",
    },
    {
        id: "3",
        title: "Industrial Arm",
        slug: "industrial-arm",
        image: "/assets/images/Category3DCover_Name3D350.jpg",
    },
    {
        id: "4",
        title: "Inspection System",
        slug: "inspection-system",
        image: "/assets/images/Category3DCover_Name3D350.jpg",
    },
];



export default function productsPage() {
    return (
        <SubContainer>
            <SubVisual
                type="video"
                src="/assets/images/video-configurator-main-trim.mp4"
                title="Products"
            />
            <div className="static">
                <h1 data-text="Products Page" className="text-grd">
                    <span>Products Page</span>
                </h1>
                <h2 className="text-trans" data-trans="Products">
                    <span>Products</span>
                </h2>
            </div>

            <div className="alone">
                <ProductItem
                    id="featured"
                    title="Inspection System"
                    slug="inspection-system"
                    image="/assets/images/Category3DCover_Name3D350.jpg"
                />
            </div>

            {/* Product List */}
            <section className="products-section">
                <div className="products-container">
                    <ProductGrid products={PRODUCTS} />
                </div>
            </section>
        </SubContainer>
    )
}   