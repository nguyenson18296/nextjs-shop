import { HomePageSection } from "@/components/HomePageSection/HomePageSection"
import { HeaderFlashSale } from "./Header"
import { ListProduct } from "@/components/ProductThumbnail/ProductThumbnail"

export const FlashSale: React.FC = () => {
    return (
        <>
            <HomePageSection
                name="Today's" 
                renderHeader={<HeaderFlashSale />}
                renderContent={<ListProduct />}
            />
        </>
    )
}
