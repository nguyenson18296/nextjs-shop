"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { DisplayPrice } from "@/components/DisplayPrice/DisplayPrice";
import { ProductInputQuantity } from "@/components/common/ProductInputQuantity/ProductInputQuantity";
import { Button } from "@/components/common/Button";
import { formatVndCurrency } from "@/utils/format";
import { Modal } from "@/components/common/Modal";

export interface IProductInCart {
  id: number;
  thumbnail: string;
  title: string;
  images: string[];
  price: string;
  discount_price?: string;
  description: string;
  slug: string;
}

export interface ICartItem {
  index: number;
  checked: boolean;
  id: number;
  quantity: number;
  product: IProductInCart;
  onChangeQuantityItem: (index: number, quantity: number) => void;
  onChangeCheckedItem: (index: number, checked: boolean) => void;
  onDeleteCartItem: (cartItemId: number, index: number) => void;
}

export const CartItem: React.FC<ICartItem> = ({
  id,
  checked,
  index,
  quantity,
  product,
  onChangeQuantityItem,
  onChangeCheckedItem,
  onDeleteCartItem,
}) => {
  const [open, setOpen] = useState(false);
  const [quantityProduct, setQuantityProduct] = useState(quantity);
  const [checkedState, setChecked] = useState(checked);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.currentTarget;
      setChecked(checked);
      onChangeCheckedItem(index, checked);
    },
    [index, onChangeCheckedItem]
  );

  const openConfirmDeleteModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onChangeQuantity = useCallback(
    (quantity: number) => {
      if (quantity >= 1) {
        setQuantityProduct(quantity);
        onChangeQuantityItem(index, quantity);
      } else {
        openConfirmDeleteModal();
      }
    },
    [index, openConfirmDeleteModal, onChangeQuantityItem]
  );

  const amount = useMemo(() => {
    const price =
      typeof Number(product?.price) === "number" ? Number(product.price) : 0;
    const discountPrice =
      typeof Number(product?.discount_price) === "number"
        ? Number(product.discount_price)
        : 0;
    return (discountPrice || price) * quantity;
  }, [product?.price, product?.discount_price, quantity]);

  const onDelete = useCallback(async () => {
    await onDeleteCartItem(id, index);
    setOpen(false);
  }, [onDeleteCartItem, id, index]);

  const onCancel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Modal
        open={open}
        headerText="Xoá sản phẩm khỏi giỏ hàng"
        onSubmit={onDelete}
        onCancel={onCancel}
      >
        Bạn có chắc muốn xoá món hàng này khỏi giỏ hàng?
      </Modal>
      <div className="cart-item bg-[#fff] rounded-sm shadow-md mb-4">
        <div className="p-4 flex items-center">
          <div className="flex items-center mt-4 mr-2">
            <input
              checked={checkedState}
              onChange={onChange}
              id="orange-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-orange-500 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="flex items-center w-[40%]">
            <div className="flex items-center">
              <div className="min-w-[100px]">
                <Link href={`/san-pham/${product.slug}`}>
                  <Image
                    src={product.thumbnail}
                    alt="product"
                    width={80}
                    height={80}
                  />
                </Link>
              </div>
              <div className="px-2">
                <Link href={`/san-pham/${product.slug}`}>{product.title}</Link>
              </div>
            </div>
          </div>
          <div className="flex items-center w-[20%]">
            <div className="flex items-center">
              <DisplayPrice
                price={product.price}
                discount_price={product.discount_price}
              />
            </div>
          </div>
          <div className="w-[10%]">
            <ProductInputQuantity
              disabled={quantityProduct < 1}
              quantity={quantityProduct}
              setQuantity={onChangeQuantity}
            />
          </div>
          <div className="text-center w-[15%]">{formatVndCurrency(amount)}</div>
          <div className="w-[10%]">
            <Button buttonType="danger" name="Xoá" onClick={openConfirmDeleteModal} />
          </div>
        </div>
      </div>
    </>
  );
};
