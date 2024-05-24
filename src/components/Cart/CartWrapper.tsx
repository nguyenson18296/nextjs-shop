"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { useForm, FormProvider } from 'react-hook-form'
import cx from 'classnames';
import dayjs from 'dayjs';
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

import { Button } from "../common/Button";
import { CheckoutInfo, IFormValue } from "./CheckoutInfo";
import { IToast, Toast } from "../common/Toast/Toast";
import { ICartItem, CartItem } from "./CartItem/CartItem";
import { formatVndCurrency } from "@/utils/format";
import { BASE_URL } from "@/constants";
import { useAppDispatch } from "@/libs/hooks/useRedux";
import { clearCart } from "@/libs/store/listProductsSlice";

interface ICart {
  carts: ICartItem[];
}

export const CartWrapper: React.FC<ICart> = ({ carts }) => {
  const [cartState, setCartState] = useState(
    (carts || []).map((item) => ({
      ...item,
      checked: true,
    }))
  );
  const [showToast, setShowToast] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const methods = useForm<IFormValue>();
  const { formState, handleSubmit } = methods;
  const access_token = localStorage.getItem('token');
  const dispatch = useAppDispatch();

  const [toastState, setToastState] = useState<IToast>({
    textMessage: "Sản phẩm đã được xoá",
    type: "success",
    icon: <MdDelete />,
  });

  useEffect(() => {
    setCartState(
      (carts || []).map((item) => ({
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

  const onDeleteCartItem = useCallback(
    async (cartItemId: number, index: number) => {
      try {
        const response = await fetch(
          `${BASE_URL}/cart/cart-item/${cartItemId}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (data.success) {
          const cloneArr = [...cartState];
          cloneArr.splice(index, 1);
          setCartState(cloneArr);
          setShowToast(true);
        } else {
          setToastState({
            textMessage: "Sản phẩm xoá thất bại",
            icon: <IoMdCloseCircle />,
            type: "danger",
          });
          setShowToast(true);
        }
      } catch (e) {
        console.error("error", e);
      }
    },
    [cartState]
  );

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

  const transform = !isCheckedOut ? "w-full" : "w-[800px]";

  const tableWidth = !isCheckedOut ? [40, 25, 10, 15, 10] : [40, 25, 15, 10, 0];

  const onCheckout = useCallback(() => {
    setIsCheckedOut(true);
  }, []);

  const onSubmit = useCallback(async (data: IFormValue) => {
    try {
      const lineItems = cartState.map(cart => ({
        id: cart.product.id,
        quantity: cart.quantity
      }))
      const formData = {
        issued_date: dayjs().format('DD/MM/YYYY'),
        line_items: lineItems,
        payment_status: "PENDING",
        // order_number: "ORD_114",
        contact_detail: {
          address: data.address,
          full_name: data.full_name,
          phone: data.phone
        }
      }
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
        },
        body: JSON.stringify(formData)
      })
      const dataResponse = await response.json();
      if (dataResponse.success) {
        dispatch(clearCart())
        window.location.replace('/gio-hang/thanh-toan-thanh-cong')
      } else {
        setToastState({
          textMessage: "Đặt hàng không thành công",
          type: "danger",
          icon: <MdDelete />,
        })
      }
    } catch (e) {
      console.error('e', e);
    }
  }, [cartState, access_token, dispatch]);

  if (cartState.length === 0) {
    return (
      <main className="p-5 h-[70vh] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="flex justify-center mb-6">
          <FaShoppingCart width={130} height={130} className="w-[130px] h-[130px] text-[#ffd400]" />
        </div>
        <div>
          <h1 className="font-bold text-3xl mb-1">
            Giỏ hàng đang để trống
          </h1>
          <p>
            Tiếp tục mua hàng&nbsp;
            <Link href={'/san-pham'} className="underline">
              tại đây
            </Link>
          </p>
        </div>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-5">
      <Toast {...toastState} show={showToast} />
      <div className="flex items-start">
        <div className={
          cx(
            transform,
            'mr-2',
            {
              'flex-[0_0_70%]': isCheckedOut,
              'flex-[0_0_100%]': !isCheckedOut
            }
          )
        }>
          <div className="cart-header-bar bg-[#fff] rounded-sm shadow-md mt-4 p-4">
            <div className="p-4 flex items-center">
              {!isCheckedOut && (
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
              )}
              <label
                htmlFor="all-checkbox"
                className="ml-2"
                style={{
                  width: `${tableWidth[0]}%`,
                }}
              >
                Sản Phẩm
              </label>
              <div
                style={{
                  width: `${tableWidth[1]}%`,
                }}
                className="text-center"
              >
                Đơn Giá
              </div>
              <div
                style={{
                  width: `${tableWidth[2]}%`,
                }}
                className="text-center"
              >
                Số Lượng
              </div>
              <div
                style={{
                  width: `${tableWidth[3]}%`,
                }}
                className="text-center"
              >
                Số Tiền
              </div>
              {!isCheckedOut && (
                <div
                  style={{
                    width: `${tableWidth[4]}%`,
                  }}
                  className="w-[10%]"
                >
                  Thao Tác
                </div>
              )}
            </div>
          </div>
          {cartState.map((cart, index) => (
            <CartItem
              key={cart.id}
              {...cart}
              index={index}
              isCheckedOut={isCheckedOut}
              onChangeQuantityItem={onChangeQuantityItem}
              onChangeCheckedItem={onChangeCheckedItem}
              onDeleteCartItem={onDeleteCartItem}
            />
          ))}
        </div>
        {isCheckedOut && (
          <FormProvider {...methods}>
            <CheckoutInfo />
          </FormProvider>
        )}
      </div>
      <div className="cart-footer-bar bg-[#fff] rounded-sm shadow-md mt-4 p-4">
        <div className="p-4 flex items-center">
          <div className="w-[120px]" />
          <div className="flex items-center w-[50%]" />
          <div className="w-[20%]"></div>
          <div className="w-[20%]" />
          <div className="w-[20%]">{formatVndCurrency(totalPrice)}</div>
          <div className="w-[20%]">
            <Button
              onClick={isCheckedOut ? handleSubmit(onSubmit) : onCheckout}
              buttonType="primary" 
              name="Mua hàng"
            />
          </div>
        </div>
      </div>
    </main>
  );
};
