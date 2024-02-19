import { formatVndCurrency } from "@/utils/format";
import { memo } from "react";

interface IDisplayPrice {
  price: string;
  text_size?: string;
  discount_price?: string;
}

const DisplayPriceComponent: React.FC<IDisplayPrice> = ({
  price,
  text_size = 'text-base',
  discount_price,
}) => {
  if (discount_price && !!+discount_price) {
    return (
      <>
        <span className={`${text_size} text-[#DB4444]`}>
          {formatVndCurrency(+discount_price)}
        </span>
        <span className={`${text_size} text-[#000] ml-3 line-through`}>
          {formatVndCurrency(+price)}
        </span>
      </>
    );
  }

  return (
    <span className={`${text_size} text-[#000]`}>{formatVndCurrency(+price)}</span>
  );
};

export const DisplayPrice = memo(DisplayPriceComponent);
