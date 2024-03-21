import { useCallback, useState } from "react";
import InputRange, { Range } from "react-input-range";
import cx from "classnames";

import { FilterSectionItem } from "@/components/FilterSectionItems/FilterSectionItems";
import { InputNumber } from "./InputNumber";
import { BASE_URL } from "@/constants";
import { Button } from "./Button";
import { useAppDispatch } from "@/libs/hooks/useRedux";
import { getProductsAction, getTotal, setIsLoading } from "@/libs/store/listProductsSlice";

import "react-input-range/lib/css/index.css";

export const PriceRangeFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState({
    min: 0,
    max: 5000000,
  });

  const onChange = useCallback((e: Range) => {
    setValue({
      min: e.min,
      max: e.max,
    });
  }, []);

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setValue((prevState) => ({
        ...prevState,
        [name]: parseFloat(value), // Parse the input value to a number
      }));
    },
    []
  );

  const onApply = useCallback(async () => {
    dispatch(setIsLoading(true));
    const response = await fetch(
      `${BASE_URL}/products?min_price=${value.min ?? ""}&max_price=${
        value.max ?? ""
      }`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    dispatch(getProductsAction(data.data));
    dispatch(getTotal(data.total));
    dispatch(setIsLoading(false));
  }, [value, dispatch]);

  return (
    <FilterSectionItem sectionName="Price range">
      <div className="mt-3">
        <InputRange
          step={100000}
          maxValue={5000000}
          minValue={0}
          value={value}
          onChange={(e) => onChange(e as Range)}
          draggableTrack={false}
        />
      </div>
      <div className={cx("input-values", "flex mt-8")}>
        <div className={cx("input-item", "flex flex-col")}>
          <InputNumber
            label="Min"
            value={value.min}
            name="min"
            onChange={onChangeInput}
          />
        </div>
        <div className={cx("input-item ml-2", "flex flex-col")}>
          <InputNumber
            label="Max"
            value={value.max}
            name="max"
            onChange={onChangeInput}
          />
        </div>
      </div>
      <Button name="Apply" onClick={onApply} className="mt-3" />
    </FilterSectionItem>
  );
};
