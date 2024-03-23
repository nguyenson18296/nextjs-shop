"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

import { Button } from "../common/Button";
import { IToast, Toast } from "../common/Toast/Toast";
import { ICartItem, CartItem } from "./CartItem/CartItem";
import { formatVndCurrency } from "@/utils/format";
import { BASE_URL } from "@/constants";

interface ICart {
  carts: ICartItem[];
}

export const CartWrapper: React.FC<ICart> = ({ carts }) => {
  const [cartState, setCartState] = useState(
    carts.map((item) => ({
      ...item,
      checked: true,
    }))
  );
  const [showToast, setShowToast] = useState(false);
  const [toastState, setToastState] = useState<IToast>({
    textMessage: "Sản phẩm đã được xoá",
    type: 'success',
    icon: <MdDelete />
  })

  useEffect(() => {
    setCartState(
      carts.map((item) => ({
        ...item,
        checked: true,
      }))
    );
  }, [carts]);

  const onChangeQuantityItem = useCallback(
    (index: number, quantity: number) => {
      const cloneArr = [...cartState];
      cloneArr[index].quantity = quantity;
      setCartState(cloneArr);
    },
    [cartState]
  );

  const onChangeCheckedItem = useCallback(
    (index: number, checked: boolean) => {
      const cloneArr = [...cartState];
      cloneArr[index].checked = checked;
      setCartState(cloneArr);
    },
    [cartState]
  );

  const totalPrice = useMemo(() => {
    let price = 0;
    for (let i = 0; i < cartState.length; i++) {
      if (cartState[i].checked) {
        price +=
          cartState[i].quantity *
          (Number(
            cartState[i].product.discount_price ?? cartState[i].product.price
          ) || 0);
      }
    }
    return price;
  }, [cartState]);

  const totalChecked = useMemo(
    () => cartState.every((item) => item.checked),
    [cartState]
  );

  const onDeleteCartItem = useCallback(async (cartItemId: number, index: number) => {
    try {
        const response = await fetch(`${BASE_URL}/cart/cart-item/${cartItemId}`, {
            method: "DELETE"
        });
        const data = await response.json();
        if (data.success) {
            const cloneArr = [...cartState];
            cloneArr.splice(index, 1);
            setCartState(cloneArr);
            setShowToast(true);
        } else {
            setToastState({
                "textMessage": "Sản phẩm xoá thất bại",
                icon: <IoMdCloseCircle />,
                type: 'danger'
            })
            setShowToast(true);
        }
    } catch (e) {
        console.error("error", e);
        console.log("error", e);
    }
  }, [cartState]);

  const onToggleCheckAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.currentTarget;
      setCartState((items) =>
        items.map((cartItem) => ({
          ...cartItem,
          checked: checked,
        }))
      );
    },
    []
  );

  return (
    <main className="pt-5">
        <Toast {...toastState} show={showToast} />
      <div className="cart-header-bar bg-[#fff] rounded-sm shadow-md mt-4 p-4">
        <div className="p-4 flex items-center">
          <div className="flex items-center">
            <input
              checked={totalChecked}
              onChange={onToggleCheckAll}
              id="all-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <label
            htmlFor="all-checkbox"
            className="w-[40%] ml-2"
          >
            Sản Phẩm
          </label>
          <div className="w-[20%] text-center">Đơn Giá</div>
          <div className="w-[10%] text-center">Số Lượng</div>
          <div className="w-[15%] text-center">Số Tiền</div>
          <div className="w-[10%]">Thao Tác</div>
        </div>
      </div>
      {cartState.map((cart, index) => (
        <CartItem
          key={cart.id}
          {...cart}
          index={index}
          onChangeQuantityItem={onChangeQuantityItem}
          onChangeCheckedItem={onChangeCheckedItem}
          onDeleteCartItem={onDeleteCartItem}
        />
      ))}
      <div className="cart-footer-bar bg-[#fff] rounded-sm shadow-md mt-4 p-4">
        <div className="p-4 flex items-center">
          <div className="w-[120px]" />
          <div className="flex items-center w-[50%]" />
          <div className="w-[20%]"></div>
          <div className="w-[20%]" />
          <div className="w-[20%]">
            {formatVndCurrency(totalPrice)}
          </div>
          <div className="w-[20%]">
            <Button buttonType="primary" name="Mua hàng" />
          </div>
        </div>
      </div>
    </main>
  );
};
