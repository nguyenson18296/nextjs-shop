import { useCallback } from "react";
import cx from "classnames";
import { IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";

import { useSetSearchParams } from "@/libs/hooks/useSetSearchParams";
import { useAppSelector, useAppDispatch } from "@/libs/hooks/useRedux";
import { IFIlterCard, setFilters } from "@/libs/store/listProductsSlice";

const FilterCard: React.FC<IFIlterCard> = ({ id, name }) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.productsSlice.filters);

  useSetSearchParams(
    "category_id",
    filters
        .map((item) => item.id)
        .join(",")
  );

  const onRemovedFilter = useCallback(
    (id: number) => {
      const newFilteredArr = filters.filter((item) => item.id !== id);
      dispatch(setFilters(newFilteredArr));
    },
    [dispatch, filters]
  );

  return (
    <div
      className={cx(
        "px-2 py-1 flex items-center",
        "border border-[#0D6EFD] rounded",
        "w-max text-base font-normal ml-2 first:ml-0 cursor-pointer text-[#505050]"
      )}
    >
      <span>{name}</span>
      <IoClose onClick={() => onRemovedFilter(id)} className="ml-2" />
    </div>
  );
};

export const FilterItems: React.FC = () => {
  const filters = useAppSelector((state) => state.productsSlice.filters);
  const dispatch = useAppDispatch();

  useSetSearchParams(
    "category_id",
    ''
  );

  const onClearAllFilters = useCallback(() => {
    dispatch(setFilters([]));
  }, [dispatch]);

  return (
    <div className={cx("filter-items", "flex items-center")}>
      {filters.length > 0 &&
        filters.map((item) => <FilterCard key={item.id} {...item} />)}

        {filters.length > 0 && (
            <span
                className="cursor-pointer ml-4 text-[#0D6EFD] text-base font-normal"
                onClick={onClearAllFilters}
            >
                Clear all filter
            </span>
        )}
    </div>
  );
};
