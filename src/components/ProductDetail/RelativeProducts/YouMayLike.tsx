"use client";
import { useEffect, useCallback, useState } from "react";

import Image from "next/image";

import { IProductThumbnail } from "@/components/ProductThumbnail/ProductThumbnail";
import { DisplayPrice } from "@/components/DisplayPrice/DisplayPrice";
import { BASE_URL } from "@/constants";
import Link from "next/link";

export const YouMayLike: React.FC = () => {
  const [products, setProducts] = useState<IProductThumbnail[]>([]);

  const getRandomProducts = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/random`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getRandomProducts();
  }, [getRandomProducts]);

  return (
    <div className="you-may-like-products bg-white border border-2 border-[#e5e7eb] p-4 mt-4 ml-3 flex-[0_0_30%]">
      <h3 className="font-bold">You may like</h3>
      {products.map((product) => (
        <div className="product-item flex mt-3 first:mt-0" key={product.id}>
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={50}
            height={30}
          />
          <div className="ml-2">
            <Link href={`/san-pham/${product.slug}`}>
                <h4 className="text-xs">{product.title}</h4>
            </Link>
            <div>
              <DisplayPrice
                price={product.price}
                text_size="text-xs"
                discount_price={product.discount_price}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
