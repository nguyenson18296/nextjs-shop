import { useCallback, useState } from "react";
import cx from "classnames";
import { IoGrid } from "react-icons/io5";
import { FaThList } from "react-icons/fa";

import { useAppSelector, useAppDispatch } from "@/libs/hooks/useRedux";
import { TDisplayType, setDisplayType } from "@/libs/store/listProductsSlice";

export const DisplayBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const displayType = useAppSelector(state => state.productsSlice.displayType);
  const total = useAppSelector(state => state.productsSlice.total);

  const onSelectDisplayType = useCallback((type: TDisplayType) => {
    dispatch(setDisplayType(type));
  }, [dispatch]);

  return (
    <div
      className={cx(
        "display-bar-wrapper",
        "p-5 bg-white mb-5",
        "flex items-center justify-between",
        'border border-[#DEE2E7] rounded-md'
      )}
    >
      <span>{total} items</span>
      <div className="flex items-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={cx(
                "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white",
                {
                    'bg-[#DEE2E7]': displayType === 'list'
                }
            )}
            onClick={() => onSelectDisplayType('list')}
          >
            <FaThList />
          </button>
          <button
            type="button"
            className={cx(
                "px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white",
                {
                    'bg-[#DEE2E7]': displayType === 'grid'
                }
            )}
            onClick={() => onSelectDisplayType('grid')}
          >
            <IoGrid />
          </button>
        </div>
      </div>
    </div>
  );
};
