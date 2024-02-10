import { useMemo } from "react";
import cx from 'classnames';

import { Dropdown } from "../Dropdown";

interface IPaginiation {
  total: number;
  limit: number;
  currenPage: number;
  onChangePage: (page: number) => void;
  onChangePerPage: (page: number) => void;
}

export const Pagination: React.FC<IPaginiation> = ({
  total,
  limit,
  currenPage = 1,
  onChangePage,
  onChangePerPage
}) => {

  const totalPage = useMemo(() => {
    return Math.ceil(total/limit);
  }, [total, limit]);

  const listPages = useMemo(() => {
    return Array.from({length: totalPage}, (_, i) => i + 1)
  }, [totalPage]);

  return (
    <nav aria-label="Page navigation example" className="mt-4 flex items-center justify-between">
      <Dropdown limit={limit} onChangePerPage={onChangePerPage} />
      <ul className="flex items-center justify-end -space-x-px h-8 text-sm">
        <li
            onClick={() => onChangePage(currenPage - 1)}
        >
          <a
            href="#"
            className={cx(
              'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
              {
                'cursor-not-allowed opacity-70': currenPage === 1
              }
            )}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>
        {listPages.map(page => (
          <li
            key={page}
            onClick={() => onChangePage(page)}
          >
            <a
              href="#"
              className={cx('flex items-center justify-center px-3 h-8 leading-tight', {
                'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': page === currenPage,
                'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': page !== currenPage,
              })}
            >
              {page}
            </a>
          </li>
        ))}
        <li
            onClick={() => onChangePage(currenPage + 1)}
        >
          <a
            href="#"
            className={cx(
              'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
              {
                'cursor-not-allowed opacity-70': currenPage === listPages.length
              }
            )}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};
