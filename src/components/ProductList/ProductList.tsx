"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { DisplayBar } from "./DisplayBar/DisplayBar";
import { ProductsGridView } from "./ProductsGridView";
import { ProductsListView } from "./ProductListView";
import { useAppDispatch, useAppSelector } from "@/libs/hooks/useRedux";
import {
  getProductsAction,
  getTotal,
  setIsLoading,
} from "@/libs/store/listProductsSlice";
import { BASE_URL } from "@/constants";
import { FilterItems } from "../common/FilterItem";
import { Pagination } from "../common/Pagination/Pagination";

export const ProductList: React.FC = () => {
  const [currenPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { displayType, products, isLoading, total } = useAppSelector(
    (state) => state.productsSlice
  );

  const category_ids = searchParams.get("category_id");

  const getProducts = useCallback(async () => {
    dispatch(setIsLoading(true));
    let query = `offset=${offset}&limit=${limit}`;
    if (!!category_ids) {
      query = query + `category_ids=${category_ids}`
    }

    const response = await fetch(
      `${BASE_URL}/products?${query}`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    dispatch(getProductsAction(data.data));
    dispatch(getTotal(data.total));
    dispatch(setIsLoading(false));
  }, [category_ids, dispatch, offset, limit]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const renderProductsList = useCallback(() => {
    if (displayType === "grid") {
      return <ProductsGridView products={products} isLoading={isLoading} />;
    }
    return <ProductsListView products={products} isLoading={isLoading} />;
  }, [displayType, isLoading, products]);

  const onChangePage = useCallback((page: number) => {
    setCurrentPage(page);
    const offset = (page - 1) * limit;
    setOffset(offset);
  }, [limit]);

  const onChangePerPage = useCallback((perPage: number) => {
    setLimit(perPage)
  }, []);

  return (
    <div>
      <DisplayBar />
      <FilterItems />
      <div className="relative min-h-[400px] mt-4 w-full">
        {renderProductsList()}
      </div>
      <Pagination
        total={total}
        currenPage={currenPage}
        onChangePage={onChangePage}
        onChangePerPage={onChangePerPage}
        limit={limit}
      />
    </div>
  );
};
