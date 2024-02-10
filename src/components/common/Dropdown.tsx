import { useCallback, useState } from "react";
import cx from "classnames";

interface IDropdownPage {
  onChangePerPage: (page: number) => void;
  limit: number;
}

const listPerPages = [10, 20, 30, 40, 50];

export const Dropdown: React.FC<IDropdownPage> = ({ limit, onChangePerPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenDropdown = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <div className="relative">
      <button
        id="dropdownAvatarNameButton"
        data-dropdown-toggle="dropdownAvatarName"
        className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        type="button"
        onClick={onOpenDropdown}
      >
        Show {limit}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id="dropdownAvatarName"
        className={cx(
          "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600",
          {
            "hidden absolute": !isOpen,
          }
        )}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton"
        >
          {listPerPages.map((perPage) => (
            <li key={perPage}>
              <a
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                    onOpenDropdown();
                    onChangePerPage(perPage)
                }}
              >
                {perPage}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
