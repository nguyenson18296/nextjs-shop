import { ProductKindMenu } from "./ProductKindMenu/ProductKindMenu"
import { BannerSwippable } from "./BannerSwippable/BannerSwippable"

export const Banner: React.FC = () => {
    return (
        <div className="flex mt-10">
            <ProductKindMenu />
            <BannerSwippable />
        </div>
    )
}
