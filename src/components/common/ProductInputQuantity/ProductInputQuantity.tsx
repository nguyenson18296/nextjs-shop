import { useState, useCallback, memo } from "react";
import cx from "classnames";
import { FaMinus, FaPlus } from "react-icons/fa";

interface IProductInputQuantity {
  disabled?: boolean;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductInputQuantityComponent: React.FC<IProductInputQuantity> = ({
  disabled,
  quantity,
  setQuantity,
}) => {
  const decreaseQuantity = useCallback(() => {
    setQuantity(quantity - 1);
  }, [quantity, setQuantity]);

  const increaseQuantity = useCallback(() => {
    setQuantity(quantity + 1);
  }, [quantity, setQuantity]);

  const onChangeQuantity = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setQuantity(+value);
    },
    [setQuantity]
  );

  return (
    <div className="flex items-center flex-[0_0_50%]">
      <div className="input-quantity flex items-center">
        <button
          className={cx(
            "w-[32px] h-[32px] border border-gray-200 flex items-center justify-center cursor-pointer",
            {
              disabled,
            }
          )}
          onClick={decreaseQuantity}
          disabled={disabled}
        >
          <FaMinus />
        </button>
        <input
          className="h-[32px] w-[50px] border border-gray-200 text-center"
          value={quantity}
          onClick={onChangeQuantity}
        />
        <button
          className="w-[32px] h-[32px] border border-gray-200 flex items-center justify-center cursor-pointer"
          onClick={increaseQuantity}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export const ProductInputQuantity = memo(ProductInputQuantityComponent);
