import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import cx from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { LuHeart } from "react-icons/lu";
import { FaCartPlus } from "react-icons/fa";

import { BASE_URL } from "@/constants";
import { DisplayPrice } from "../DisplayPrice/DisplayPrice";

import "swiper/css";
import "swiper/css/pagination";

export interface IProductThumbnail {
  id: number;
  thumbnail: string;
  title: string;
  price: string;
  discount_price?: string;
  description?: string;
  images?: string[];
  slug: string;
}

export interface IItemSetting {
  is_product_page?: boolean;
}

export const ListProduct: React.FC = () => {
  const [products, setProducts] = useState<IProductThumbnail[]>([]);

  const getProductsList = useCallback(async () => {
    const response = await fetch(`${BASE_URL}/products`);
    const data = await response.json();
    const mappedData = (data || []).map((item: IProductThumbnail) => ({
      id: item.id,
      thumbnail: item.thumbnail,
      title: item.title,
      price: item.price,
      discount_price: item.discount_price,
    }));
    setProducts(mappedData);
  }, []);

  useEffect(() => {
    getProductsList();
  }, [getProductsList]);

  return (
    <Swiper
      pagination={{
        enabled: false,
      }}
      modules={[Pagination]}
      slidesPerView={4}
      navigation={{
        enabled: true,
        nextEl: ".best-seller-next",
        prevEl: ".best-seller-prev",
      }}
    >
      {products.map((item) => (
        <SwiperSlide key={item.id}>
          <ProductThumbnail {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const ProductThumbnail: React.FC<IProductThumbnail & IItemSetting> = ({
  thumbnail,
  title,
  price,
  slug,
  discount_price,
  is_product_page,
}) => {
  return (
    <div
      className={cx(
        "bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",
        "product-thumbnail pt-2 flex flex-col",
        {
          "first:ml-0": !is_product_page,
        }
      )}
    >
      <div className="relative group">
        <div>
          <div className="relative">
            <Image src={thumbnail} alt={title} width={270} height={250} />
            <div
              className={cx(
                "absolute right-3 top-3",
                "rounded-full bg-white w-[34px] h-[34px]",
                "flex items-center justify-center"
              )}
            >
              <LuHeart />
            </div>
            <div
              className={cx(
                "absolute right-3 top-14",
                "rounded-full bg-white w-[34px] h-[34px]",
                "flex items-center justify-center"
              )}
            >
              <FaCartPlus />
            </div>
          </div>
        </div>
        <div
          className={cx(
            "w-[270px] bg-[#000]",
            "absolute left-0 bottom-0 right-0 h-0 overflow-hidden",
            "group-hover:h-[40px] duration-200 cursor-pointer"
          )}
        >
          <div className="text-base text-[#fff] leading-10 text-center">
            Add to card
          </div>
        </div>
      </div>
      <div className="p-2">
        <Link href={`/san-pham/${slug}`}>
          <h4 className="mt-12 font-medium text-base">{title}</h4>
        </Link>
        <div className="mt-2">
          <DisplayPrice price={price} discount_price={discount_price} />
        </div>
      </div>
    </div>
  );
};
