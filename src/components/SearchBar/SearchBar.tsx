import { useCallback, useEffect, useRef, useState } from "react";
import { SearchResult, ISearchResult } from "./SearchResult";

import useDebounce from "@/hooks/useDebounce";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { BASE_URL } from "@/constants";

export const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ISearchResult[]>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedSearchTerm = useDebounce(search, 800); // Debounce search term by 500ms

  const searchProduct = useCallback(async () => {
      const response = await fetch(
        `${BASE_URL}/products?search=${debouncedSearchTerm}`
      );
      const data = await response.json();
      setProducts(data.data);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 0 && isFocus) {
      searchProduct();
      setIsOpen(true);
    }
  }, [searchProduct, isFocus, debouncedSearchTerm]);

  const handleFocusInput = useCallback(() => {
    setIsFocus(true);
  }, []);

  const handleClickOutside = useCallback(() => {
    setIsFocus(false);
    setIsOpen(false);
  }, []);

  useOnClickOutside(ref, handleClickOutside);

  const onKeyPressed = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
        e.preventDefault(); // Prevent scrolling the page
        inputRef.current?.blur();
        dropdownRef.current?.focus();
    }
  }, []);

  return (
    <form ref={ref} className="max-w-md width-[300px] mx-auto relative">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-[450px] p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Bạn cần tìm gì..."
          onChange={(e) => setSearch(e.target.value)}
          required
          ref={inputRef}
          autoComplete="off"
          onFocus={handleFocusInput}
          onKeyDown={onKeyPressed}
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
      {isOpen && <SearchResult ref={dropdownRef} products={products} />}
    </form>
  );
};
