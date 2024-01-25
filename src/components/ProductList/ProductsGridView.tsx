import cx from 'classnames';

import {
  IProductThumbnail,
  ProductThumbnail,
} from "../ProductThumbnail/ProductThumbnail";
import { Loading } from "../common/Loading";

interface IProductGridView {
  products: IProductThumbnail[];
}

export const ProductsGridView: React.FC<IProductGridView> = ({ products }) => {
  return (
    <div
        className={cx(
            {
                'flex items-center justify-center': !!products,
                'grid': products?.length > 0
            },
            "grid-cols-4 gap-x-6 gap-y-12"
        )}
        style={{
            minHeight: `calc(100vh - 400px)`
        }}
    >
      {products?.length > 0 ? (
        (products || []).map((product) => (
          <ProductThumbnail
            key={product.id}
            id={product.id}
            title={product.title}
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
