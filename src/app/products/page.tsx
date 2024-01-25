import { ProductList } from "@/components/ProductList/ProductList"
import { FilterBar } from "@/components/ProductList/FilterBar/FilterBar"

export default async function Products() {
    return (
        <div className="wrapper py-10 px-24">
            <div className="product-page-content flex">
                <FilterBar />
                <div className="flex-[0_0_80%] ml-10">
                    <ProductList />
                </div>
            </div>
        </div>
    )
}
