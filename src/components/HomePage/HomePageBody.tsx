import { FlashSale } from '@/components/HomePage/FlashSale/FlashSale';
import { Categories } from './Categories/Categories';

export const HomePageBody: React.FC = () => {
    return (
        <div className="home-page-body mt-[140px]">
            <FlashSale />
            <Categories />
        </div>
    )
}
