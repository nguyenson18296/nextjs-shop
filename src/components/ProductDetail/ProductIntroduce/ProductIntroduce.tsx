"use client"
import React, { useCallback, useState } from "react";
import cx from "classnames";

import { Modal } from "@/components/common/Modal";
import { useAppDispatch, useAppSelector } from "@/libs/hooks/useRedux";
import { ProductDetailImages } from "./ProductDetailImages";
import { DisplayPrice } from "@/components/DisplayPrice/DisplayPrice";
import { Supplier } from "@/components/Supplier/Supplier";
import { IProductDetail } from '../ProductDetail';
import { Button } from "@/components/common/Button";
import { addToCart } from "@/libs/store/listProductsSlice";
import { BASE_URL } from "@/constants";
import { ProductInputQuantity } from "@/components/common/ProductInputQuantity/ProductInputQuantity";

export const ProductIntroduce: React.FC<IProductDetail> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.userProfile);
  const [openModal, setOpenModal] = useState(false);

  const onAddToCart = useCallback(async () => {
    const formData = {
      user_id: user.id,
      product_id: product.id,
      quantity,
    }
    try {
      await fetch(`${BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
      setOpenModal(true)
      dispatch(addToCart(product.id));
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, user.id, quantity, product.id]);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  return (
    <div className="product-introduce">
      <Modal
        open={openModal}
        onCancel={onCloseModal}
        showFooter={false}
        showHeader={false}
      >
        Thêm vào giỏ hàng thành công!
      </Modal>
      <div
        className={cx(
          "product-introduce-wrapper",
          "bg-white flex items-start",
          "border border-2 border-[#e5e7eb]",
          "p-4"
        )}
      >
        <ProductDetailImages
          product_name={product?.title}
          image={product?.thumbnail}
          images={product?.images}
        />
        <div className={cx("product-info", "ml-4 flex-[0_0_49%]")}>
          <h3 className="font-bold text-lg text-[#0e172a]">{product?.title}</h3>
          <DisplayPrice
            price={product.price}
            discount_price={product.discount_price}
          />
          <div className="product-items-info">
            <div className="mt-2 w-[80%]">
              <div className="item flex">
                <div className="text-[#8b96a4] flex-[0_0_50%]">Price:</div>
                <div className="text-[#505050] flex-[0_0_50%]">Negotiable</div>
              </div>
              <hr className="my-4" />
              <div className="item flex mt-2">
                <div className="text-[#8b96a4] flex-[0_0_50%]">Type:</div>
                <div className="text-[#505050] flex-[0_0_50%]">
                  Classic shoes
                </div>
              </div>
              <div className="item flex mt-2">
                <div className="text-[#8b96a4] flex-[0_0_50%]">Material:</div>
                <div className="text-[#505050] flex-[0_0_50%]">
                  Plastic material
                </div>
              </div>
              <div className="item flex mt-2">
                <div className="text-[#8b96a4] flex-[0_0_50%]">Design:</div>
                <div className="text-[#505050] flex-[0_0_50%]">Modern nice</div>
              </div>
              <hr className="my-4" />
              <div className="item flex mt-2">
                <div className="text-[#8b96a4] flex-[0_0_50%]">
                  Customization:
                </div>
                <div className="text-[#505050] flex-[0_0_50%]">
                  Customized logo and design custom packages
                </div>
              </div>
              <div className="item flex mt-2">
                <div className="text-[#8b96a4] flex-[0_0_50%]">Protection:</div>
                <div className="text-[#505050] flex-[0_0_50%]">
                  Refund Policy
                </div>
              </div>
              <div className="item flex mt-2">
                <div className="text-[#8b96a4] flex-[0_0_50%]">Warranty:</div>
                <div className="text-[#505050] flex-[0_0_50%]">
                  2 years full warranty
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center my-2 w-[80%]">
            <h3 className="flex-[0_0_50%]">
              Số lượng
            </h3>
            <ProductInputQuantity disabled={quantity < 2} quantity={quantity} setQuantity={setQuantity} />
          </div>
          <div className="inline-flex rounded-md shadow-sm mt-2" role="group">
            <Button
              onClick={onAddToCart}
              type="button"
              name="Thêm vào giỏ hàng"
              buttonType='secondary'
            />
            <Button
              type="button"
              name="Mua ngay"
            />
          </div>
        </div>
        <Supplier />
      </div>
    </div>
  );
};
