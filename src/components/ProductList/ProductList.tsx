"use client";
import { useCallback, useEffect, useState } from "react";

import { IProductThumbnail } from "../ProductThumbnail/ProductThumbnail";
import { ProductsGridView } from "./ProductsGridView";
import { BASE_URL } from "@/constants";
import { useSearchParams } from "next/navigation";

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();

  const category_ids = searchParams.get("category_id");

  console.log("category_ids", !!category_ids);

  const getProducts = useCallback(async () => {
    const response = await fetch(
      `${BASE_URL}/products?${
        !!category_ids ? `category_ids=${category_ids}` : ""
      }`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    setProducts(data.data);
  }, [category_ids]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      <ProductsGridView products={products} />
    </div>
  );
};
