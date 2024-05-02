import { useCallback, useEffect, useRef, useState, forwardRef } from "react";
import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { DisplayPrice } from "../DisplayPrice/DisplayPrice";

export interface ICategory {
  id: number;
  title: string;
}

export interface ISearchResult {
  id: number;
  thumbnail: string;
  title: string;
  price: string;
  discount_price?: string;
  description: string;
  slug: string;
  category: ICategory;
}

interface ITransformResult {
  category_title: string;
  products: Pick<
    ISearchResult,
    "title" | "discount_price" | "price" | "thumbnail" | "id" | "slug"
  >[];
}

interface IProduct {
  products: ISearchResult[];
}
export type Ref = HTMLDivElement;

export const SearchResult = forwardRef<Ref, IProduct>(
    (
      {
        products,
      },
      dropdownRef
    ) => {
  const [display, setDisplay] = useState<ITransformResult[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<{ category: number; product: number }>({ category: -1, product: -1 });
  const router = useRouter();

  useEffect(() => {
    let transform = [] as ITransformResult[];
    products.forEach((item) => {
      const categoryTitle = item.category?.title || "Khác";

      const foundCategoryIndex = transform.findIndex(
        (t) => t.category_title === categoryTitle
      );

      let productInfo = {
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        price: item.price,
        discount_price: item.discount_price,
        slug: item.slug,
      };

      if (foundCategoryIndex !== -1) {
        // If the category is found, add the product to its products array
        transform[foundCategoryIndex].products.push(productInfo);
      } else {
        // If not found, create a new category with the product in its products array
        transform.push({
          category_title: categoryTitle,
          products: [productInfo],
        });
      }
    });
    setDisplay(transform);
  }, [products]);

  const openProductLink = useCallback((slug: string) => {
    router.push(`/san-pham/${slug}`)
  }, [router]);

  const onKeyPressed = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      let newCategoryIndex = selectedIndexes.category;
      let newProductIndex = selectedIndexes.product;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          // Check if we can move to the next product within the same category
          if (newCategoryIndex === -1 || display[newCategoryIndex].products.length - 1 === newProductIndex) {
            // Move to the next category, reset product index
            newCategoryIndex = (newCategoryIndex + 1) % display.length;
            newProductIndex = 0; // Reset to the first product of the next category
          } else {
            // Same category, move to the next product
            newProductIndex++;
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (newCategoryIndex === -1 || newProductIndex === 0) {
            // Move to the previous category
            newCategoryIndex = (newCategoryIndex - 1 + display.length) % display.length;
            // Move to the last product of the previous category
            newProductIndex = display[newCategoryIndex].products.length - 1;
          } else {
            // Same category, move to the previous product
            newProductIndex--;
          }
          break;
        case "Enter":
            const slug = display[selectedIndexes.category].products[selectedIndexes.product].slug;
          // Implement what should happen when an item is selected
          openProductLink(slug);
          break;
        default:
          return; // Ignore other keys
      }

      setSelectedIndexes({ category: newCategoryIndex, product: newProductIndex });
    },
    [display, selectedIndexes, openProductLink]
  );

  return (
    <div
      ref={dropdownRef}
      onKeyDown={onKeyPressed}
      tabIndex={0}
      id="multi-dropdown"
      className="z-10 bg-white absolute w-[600px] z-50 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      {display.length > 0 ? (
        display.map((item, catIdx) => (
          <ul
            key={item.category_title}
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="multiLevelDropdownButton"
          >
            <li
              className="px-4 py-2"
            >
              {item.category_title}
            </li>
            {item.products.map((prod, prodIdx) => (
              <li
                key={prod.id} 
                tabIndex={-1}
                className={cx("px-4 py-2", {
                    "bg-[lightgray]": catIdx === selectedIndexes.category && prodIdx === selectedIndexes.product,
                })}
            >
                <a
                  href={`/san-pham/${prod.slug}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
                >
                  <Image
                    src={prod.thumbnail}
                    width={50}
                    height={50}
                    alt="product"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold">{prod.title}</h4>
                    <DisplayPrice
                      price={prod.price}
                      discount_price={prod.discount_price}
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        ))
      ) : (
        <div className="h-[100px] flex items-center justify-center">
          <h2>Không tìm thấy sản phẩm</h2>
        </div>
      )}
    </div>
  )}
);

SearchResult.displayName = "CommentTextArea";