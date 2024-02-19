import React from "react";
import cx from "classnames";

import { ProductDetailImages } from "./ProductDetailImages";
import { DisplayPrice } from "@/components/DisplayPrice/DisplayPrice";
import { Supplier } from "@/components/Supplier/Supplier";
import { IProductDetail } from '../ProductDetail';

export const ProductIntroduce: React.FC<IProductDetail> = ({ product }) => {
  return (
    <div className="product-introduce">
      <div
        className={cx(
          "product-introduce-wrapper",
          "bg-white flex items-start",
          "border border-2 border-[#e5e7eb]",
          "p-4"
        )}
      >
        <ProductDetailImages
          product_name={product?.title}
          image={product?.thumbnail}
          images={product?.images}
        />
        <div className={cx("product-info", "ml-4 flex-[0_0_49%]")}>
          <h3 className="font-bold text-lg text-[#0e172a]">{product?.title}</h3>
          <DisplayPrice
            price={product.price}
            discount_price={product.discount_price}
          />
          <div className="product-items-info">
            <div className="mt-2 w-[80%]">
              <div className="item flex">
                <div className="text-[#8b96a4] flex-[0_0_50%]">Price:</div>
                <div className="text-[#505050] flex-[0_0_50%]">Negotiable</div>
              </div>
              <hr className="my-4" />
              <div className="item flex mt-2">
                <div className="text-[#8b96a4] flex-[0_0_50%]">Type:</div>
                <div className="text-[#505050] flex-[0_0_50%]">
                  Classic shoes
                </div>
              </div>
              <div className="item flex mt-2">
                <div className="text-[#8b96a4] flex-[0_0_50%]">Material:</div>
                <div className="text-[#505050] flex-[0_0_50%]">
                  Plastic material
                </div>
              </div>
              <div className="item flex mt-2">
                <div className="text-[#8b96a4] flex-[0_0_50%]">Design:</div>
                <div className="text-[#505050] flex-[0_0_50%]">Modern nice</div>
              </div>
              <hr className="my-4" />
              <div className="item flex mt-2">
                <div className="text-[#8b96a4] flex-[0_0_50%]">
                  Customization:
                </div>
                <div className="text-[#505050] flex-[0_0_50%]">
                  Customized logo and design custom packages
                </div>
              </div>
              <div className="item flex mt-2">
                <div className="text-[#8b96a4] flex-[0_0_50%]">Protection:</div>
                <div className="text-[#505050] flex-[0_0_50%]">
                  Refund Policy
                </div>
              </div>
              <div className="item flex mt-2">
                <div className="text-[#8b96a4] flex-[0_0_50%]">Warranty:</div>
                <div className="text-[#505050] flex-[0_0_50%]">
                  2 years full warranty
                </div>
              </div>
            </div>
          </div>
        </div>
        <Supplier />
      </div>
    </div>
  );
};
