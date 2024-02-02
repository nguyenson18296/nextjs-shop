"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { IProductThumbnail } from "../ProductThumbnail/ProductThumbnail";
import { ProductsGridView } from "./ProductsGridView";
import { useAppDispatch } from "@/libs/hooks/useRedux";
import { getProductsAction } from "@/libs/store/listProductsSlice";
import { BASE_URL } from "@/constants";
import { FilterItems } from "../common/FilterItem";

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const category_ids = searchParams.get("category_id");

  const getProducts = useCallback(async () => {
    setIsLoading(true);
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
    dispatch(getProductsAction(data.data))
    setIsLoading(false);
  }, [category_ids, dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div>
      <FilterItems />
      <ProductsGridView products={products} isLoading={isLoading} />
    </div>
  );
};
