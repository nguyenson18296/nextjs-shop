import { useState, useCallback } from 'react';
import cx from 'classnames';
import { IoIosPhonePortrait } from "react-icons/io";
import { TiWatch } from "react-icons/ti";
import { IoGameControllerOutline } from "react-icons/io5";
import { PiHeadphones } from "react-icons/pi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { MdOutlineCameraAlt } from "react-icons/md";

import { HomePageSection } from "@/components/HomePageSection/HomePageSection";
import { IconCustom } from '@/components/common/Icon';

const CATEGORIES = [
    {
        id: 1,
        name: 'Phones',
        slug: 'phones',
        // icon: <IoIosPhonePortrait className='w-[56px] h-[56px]' />
        icon: IoIosPhonePortrait
    },
    {
        id: 2,
        name: 'Computers',
        slug: 'computers',
        icon: HiOutlineDesktopComputer
    },
    {
        id: 3,
        name: 'Smartwatch',
        slug: 'smart-watch',
        icon: TiWatch
    },
    {
        id: 4,
        name: 'Camera',
        slug: 'camera',
        icon: MdOutlineCameraAlt
    },
    {
        id: 5,
        name: 'HeadPhones',
        slug: 'headphones',
        icon: PiHeadphones
    },
    {
        id: 6,
        name: 'Gaming',
        slug: 'gaming',
        icon: IoGameControllerOutline
    }
]

const CategoriesList: React.FC = () => {
    const [hoveringItem, setHoveringItem] = useState<number>(0);

    const onHovering = useCallback((itemId: number) => {
        setHoveringItem(itemId)
    }, []);

    const onNotHovering = useCallback(() => {
        setHoveringItem(0)
    }, []);

    return (
        <div className="flex items-center justify-between">
            {CATEGORIES.map(item => (
                <div
                    key={item.id}
                    className='category-item w-[170px] h-[145px] ml-[30px] rounded border border-[#0000004d] first:ml-0 group'
                    onMouseEnter={() => onHovering(item.id)}
                    onMouseLeave={onNotHovering}
                >
                    <div className={cx(
                        'flex flex-col justify-center items-center',
                        'group-hover:bg-[#DB4444] h-full',
                    )}>
                        <div>
                            <IconCustom
                                DynamicIcon={item.icon} 
                                classNames='w-[56px] h-[56px]'
                                fill={hoveringItem === item.id ? '#fff' : '#000'}
                            />
                        </div>
                        <span className='text-base font-normal group-hover:text-[#fff]'>
                            {item.name}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export const Categories: React.FC = () => {

    const renderCategoryHeader = useCallback(() => {
        return (
            <div className="header-flash-sale mt-6 flex color-[#000] font-semibold text-4xl tracking-wide">
            <h1>
                Browse By Category
            </h1>
        </div>
        )
    }, []);

    return (
        <HomePageSection
            classNames="mt-[70px]"
            name="Browse By Category"
            renderHeader={renderCategoryHeader()}
            renderContent={<CategoriesList />}
        />
    )
}