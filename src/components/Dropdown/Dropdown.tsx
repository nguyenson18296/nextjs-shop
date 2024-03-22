import { useCallback, useState, useEffect } from "react";
import cx from "classnames";
import Link from "next/link";
import { IoCartSharp } from "react-icons/io5";

import { useAppSelector, useAppDispatch } from "@/libs/hooks/useRedux";
import { getUsersProfile } from "@/libs/store/usersSlice";
import { BASE_URL } from "@/constants";
import { addToCart } from "@/libs/store/listProductsSlice";

export const NavbarDropdown: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const inCart = useAppSelector((state) => state.productsSlice.in_cart);
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.userProfile);

  const getUserProfile = useCallback(async () => {
    const response = await fetch(`${BASE_URL}/users/1`);
    const data = await response.json();
    dispatch(getUsersProfile(data.data));
    const getMyCartResponse = await fetch(`${BASE_URL}/cart/${data.data.id}`)
    const dataMyCart = await getMyCartResponse.json();
    console.log("dataMyCart.data.items", dataMyCart.data.items);
    dispatch(addToCart(dataMyCart.data.items.map((item: any) => item.id)))
  }, [dispatch]);

  console.log("inCart", inCart);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const onToggleMenu = useCallback(() => {
    setIsOpenMenu((prevState) => !prevState);
  }, []);

  return (
    <div
      className="relative flex justify-end cursor-pointer"
      onClick={onToggleMenu}
    >
      <div className="flex items-center">
        <div>
          Xin chào&nbsp;
          <span>
            {user?.username}
          </span>
        </div>
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </div>

      <div
        id="dropdownUsers"
        className={cx("z-10 bg-white absolute top-[40px] left-[50px] rounded-lg shadow w-60 dark:bg-gray-700", {
          hidden: !isOpenMenu,
        })}
      >
        <ul
          className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownUsersButton"
        >
          <li>
            <Link
              href="/gio-hang"
              replace={false}
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <span>
                Giỏ hàng:
              </span>
              <div className="relative">
                <IoCartSharp className="ml-2 w-[30px] h-[30px]" />
                <span className="absolute right-0 top-0 bg-[red] text-white w-[15px] h-[15px] text-center text-xs rounded-full">
                  {inCart.length}
                </span>
              </div>
            </Link>
          </li>
        </ul>
        <a
          href="#"
          className="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline"
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
          </svg>
          Add new user
        </a>
      </div>
    </div>
  );
};
