"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { DisplayBar } from "./DisplayBar/DisplayBar";
import { ProductsGridView } from "./ProductsGridView";
import { ProductsListView } from "./ProductListView";
import { useAppDispatch, useAppSelector } from "@/libs/hooks/useRedux";
import { getProductsAction, getTotal } from "@/libs/store/listProductsSlice";
import { BASE_URL } from "@/constants";
import { FilterItems } from "../common/FilterItem";

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const displayType = useAppSelector(state => state.productsSlice.displayType);

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
    dispatch(getTotal(data.total))
    setIsLoading(false);
  }, [category_ids, dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const renderProductsList = useCallback(() => {
    if (displayType === 'grid') {
      return (
        <ProductsGridView products={products} isLoading={isLoading} />
      )
    }
    return <ProductsListView products={products} isLoading={isLoading} />
  }, [displayType, isLoading, products]);

  return (
    <div>
      <DisplayBar />
      <FilterItems />
      {renderProductsList()}
    </div>
  );
};
