import React from "react";

import { ProductIntroduce } from "./ProductIntroduce/ProductIntroduce";
import { ProductDescription } from "./ProductDescription/ProductDescription";
import { YouMayLike } from "./RelativeProducts/YouMayLike";
import { IComment } from "../ReviewProduct/ReviewProduct";

export interface IProductDetail {
  product: {
    id: number;
    thumbnail: string;
    title: string;
    images: string[];
    price: string;
    discount_price?: string;
    description: string;
    comments: IComment[];
  };
}

export const ProductDetail: React.FC<IProductDetail> = ({ product }) => {
  return (
    <div className="product-detail py-10 px-24">
      <ProductIntroduce product={product} />
      <div className="flex">
        <ProductDescription
          id={product?.id}
          description={product.description}
          comments={product.comments}
        />
        <YouMayLike />
      </div>
    </div>
  );
};
