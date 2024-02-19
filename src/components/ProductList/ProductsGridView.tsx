import cx from 'classnames';

import {
  IProductThumbnail,
  ProductThumbnail,
} from "../ProductThumbnail/ProductThumbnail";
import { Loading } from "../common/Loading";

interface IProductGridView {
  products: IProductThumbnail[];
  isLoading: boolean;
}

export const ProductsGridView: React.FC<IProductGridView> = ({ products, isLoading }) => {
  return (
    <div
        className={cx(
            {
                'flex items-center justify-center': !!products,
                'grid': products?.length > 0
            },
            "grid-flow-row-dense grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-x-6 gap-y-12"
        )}
        style={{
            minHeight: `calc(100vh - 400px)`
        }}
    >
      {!isLoading ? (
        (products || []).map((product) => (
          <ProductThumbnail
            key={product.id}
            id={product.id}
            title={product.title}
            slug={product.slug}
            thumbnail={product.thumbnail}
            price={product.price}
            discount_price={product.discount_price}
            is_product_page
          />
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};
