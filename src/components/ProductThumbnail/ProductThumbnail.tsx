import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import cx from 'classnames';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { BASE_URL } from '@/constants';
import { formatVndCurrency } from '@/utils/format';

import "swiper/css";
import "swiper/css/pagination";

interface IProductThumbnail {
    id: number;
    thumbnail: string;
    title: string;
    price: string;
    discount_price: string;
}

export const ListProduct: React.FC = () => {
    const [products, setProducts] = useState<IProductThumbnail[]>([]);

    const getProductsList = useCallback(async () => {
        const response = await fetch(`${BASE_URL}/products`)
        const data = await response.json()
        const mappedData = (data || []).map((item: IProductThumbnail) => ({
            id: item.id,
            thumbnail: item.thumbnail,
            title: item.title,
            price: item.price,
            discount_price: item.discount_price
        }))
        setProducts(mappedData);
    }, []);

    useEffect(() => {
        getProductsList();
    }, [getProductsList]);

    return (
        <Swiper
            pagination={{
                enabled: false
            }}
            modules={[Pagination]} 
            slidesPerView={4}
            navigation={{
                enabled: true,
                nextEl: '.best-seller-next',
                prevEl: '.best-seller-prev'
            }}
        >
            {products.map((item) => (
                <SwiperSlide key={item.id}>
                    <ProductThumbnail
                        {...item}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

const ProductThumbnail: React.FC<IProductThumbnail> = ({
    thumbnail,
    title,
    price,
    discount_price
}) => {
    const renderPrice = useCallback(() => {
        if (!!+discount_price) {
            return (
                <>
                    <span className='text-base text-[#DB4444]'>
                        {formatVndCurrency(+discount_price)}
                    </span>
                    <span className='text-base text-[#000] ml-3 line-through'>
                        {formatVndCurrency(+price)}
                    </span>
                </>
            )
        }
        return (
            <span className='text-base text-[#000]'>
                {formatVndCurrency(+price)}
            </span>
        )
    }, [discount_price, price]);

    return (
        <div className="product-thumbnail flex flex-col ml-[30px] first:ml-0">
            <div className='relative group'>
                <Image
                    src={thumbnail}
                    alt={title}
                    width={270}
                    height={250}
                />
                <div className={cx(
                    'w-[270px] h-[40px] bg-[#000]',
                    'absolute left-0 bottom-0 right-0 h-0',
                    'group-hover:h-[40px] duration-200 cursor-pointer'
                )}>
                    <div className='text-base text-[#fff] leading-10 text-center'>
                        Add to card
                    </div>
                </div>
            </div>
            <h4 className='mt-4 font-medium text-base'>
                {title}
            </h4>
            <div className='mt-2'>
                {renderPrice()}
            </div>
        </div>
    )
}