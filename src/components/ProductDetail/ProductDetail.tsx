import React from "react";

import { ProductIntroduce } from "./ProductIntroduce/ProductIntroduce";
import { ProductDescription } from "./ProductDescription/ProductDescription";
import { YouMayLike } from "./RelativeProducts/YouMayLike";

export interface IProductDetail {
    product: {
      thumbnail: string;
      title: string;
      images: string[];
      price: string;
      discount_price?: string;
      description: string;
    };
  }

export const ProductDetail: React.FC<IProductDetail> = ({
    product
}) => {
    return (
        <div className="product-detail py-10 px-24">
            <ProductIntroduce product={product} />
            <div className="flex">
                <ProductDescription
                    description={product.description}
                />
                <YouMayLike />
            </div>
        </div>
    )
}
