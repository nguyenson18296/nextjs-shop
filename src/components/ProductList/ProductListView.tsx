import { useCallback } from "react";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";

import { IProductThumbnail } from "../ProductThumbnail/ProductThumbnail";
import { Loading } from "../common/Loading";
import { formatVndCurrency } from "@/utils/format";

interface IProductsListView {
  products: IProductThumbnail[];
  isLoading: boolean;
}

export const ProductsListView: React.FC<IProductsListView> = ({
  isLoading,
  products,
}) => {
  return (
    <>
      {!isLoading ? (
        (products || []).map((product) => (
          <ProductListViewItem key={product.id} {...product} />
        ))
      ) : (
        <div className="absolute bg-white top-1/2 left-1/2">
          <Loading />
        </div>
      )}
    </>
  );
};

export const ProductListViewItem: React.FC<IProductThumbnail> = ({
  thumbnail,
  title,
  price,
  discount_price,
  description,
  slug,
}) => {
  const renderPrice = useCallback(() => {
    if (!!+discount_price) {
      return (
        <>
          <span className="text-base text-[#DB4444]">
            {formatVndCurrency(+discount_price)}
          </span>
          <span className="text-base text-[#000] ml-3 line-through">
            {formatVndCurrency(+price)}
          </span>
        </>
      );
    }
    return (
      <span className="text-base text-[#000]">{formatVndCurrency(+price)}</span>
    );
  }, [discount_price, price]);

  return (
    <div
      className={cx(
        "product-list-view-item",
        "w-full bg-white mt-2 px-3 py-3 first:mt-0",
        "flex items-start"
      )}
    >
      <Image src={thumbnail} alt={title} width={210} height={210} />
      <div className={cx("product-detail", "ml-4")}>
        <Link href={`/san-pham/${slug}` ?? '#'}>
          <h4 className={cx("text-base font-medium text-[#1C1C1C] mb-4")}>
            {title}
          </h4>
        </Link>
        {renderPrice()}
        <div
          className={cx(
            "product-description",
            "my-3 text-sm font-normal text-[#505050]"
          )}
        >
          {description}
        </div>
        <Link className={cx("text-[#0D6EFD] text-sm mt-2")} href={`/san-pham/${slug}` ?? '#'}>
          View detail
        </Link>
      </div>
    </div>
  );
};
