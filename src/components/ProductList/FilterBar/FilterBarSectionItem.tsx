"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/common/Button";
import { Loading } from "@/components/common/Loading";
import { isEmpty, remove } from "@/utils/utils";
import { useAppDispatch, useAppSelector } from "@/libs/hooks/useRedux";
import { setFilters } from "@/libs/store/listProductsSlice";
import { useSetSearchParams } from "@/libs/hooks/useSetSearchParams";

interface IFilterValue {
  id: number;
  name: string;
}

interface IFilterBarSectionItem {
  sectionName: string;
  items: IFilterValue[];
}

export const FilterBarSectionItem: React.FC<IFilterBarSectionItem> = ({
  sectionName,
  items,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<IFilterValue[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.productsSlice.filters);

  useSetSearchParams(
    "category_id",
    selectedFilter.map((item) => item.id).join(",")
  );

  const category_ids = searchParams.get("category_id");

  const setInitCategoriesIds = useCallback(() => {
    if (category_ids?.length) {
      const arrIds = category_ids.split(",");
      let arr = [] as IFilterValue[];
      arrIds.forEach((id) => {
        const findedItem = items.find((item) => item.id === +id);
        if (findedItem) {
          arr.push(findedItem);
        }
      });
      dispatch(setFilters(arr));
    }
  }, [items, category_ids, dispatch]);

  useEffect(() => {
    setInitCategoriesIds();
  }, [setInitCategoriesIds]);

  const onChangeCheckBox = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const cloneArr = [...items];
      const clickedItem = cloneArr.find(
        (item) => item.id === +value
      ) as IFilterValue;
      if (selectedFilter.map((item) => item.id).includes(+value)) {
        const cloneArr = [...selectedFilter];
        remove(cloneArr, (item) => item.id === +value);
        dispatch(setFilters(cloneArr));
      } else {
        const updatedArr = [...selectedFilter].concat({
          id: +value,
          name: clickedItem.name,
        });
        dispatch(setFilters(updatedArr));
      }
    },
    [items, selectedFilter, dispatch]
  );

  useEffect(() => {
    setSelectedFilter(filters);
  }, [filters]);

  const createQueryString = useCallback(() => {
    dispatch(setFilters(selectedFilter));
  }, [dispatch, selectedFilter]);

  if (isEmpty(items)) {
    return (
      <div className="filter-bar-section-item h-[200px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="filter-bar-section-item">
      <hr className="h-0.5" />
      <h4 className="text-base mt-3 font-semibold">{sectionName}</h4>
      <ul className="mt-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="text-[#505050] text-base font-normal py-1"
          >
            <label htmlFor={item.name}>
              <input
                type="checkbox"
                onChange={onChangeCheckBox}
                value={item.id}
                id={item.name}
                checked={selectedFilter
                  .map((item) => item.id)
                  .includes(item.id)}
              />
              <span className="ml-2">{item.name}</span>
            </label>
          </li>
        ))}
      </ul>
      <Button name="Search" className="mt-4" onClick={createQueryString} />
    </div>
  );
};
