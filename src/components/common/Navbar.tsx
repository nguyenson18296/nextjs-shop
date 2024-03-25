'use client'
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoLogIn } from "react-icons/io5";

import { SearchBar } from "../SearchBar/SearchBar";
import { NavbarDropdown } from "../Dropdown/Dropdown";
import { BASE_URL } from "@/constants";
import logo from '@/assets/logo.webp';

interface INavItem {
  title: string;
  icon: string;
  slug: string;
}

const ISSERVER = typeof window === "undefined";

export const Navbar: React.FC = () => {
  const [navItems, setNavItems] = useState<INavItem[]>([]);
  const access_token = localStorage.getItem('token');

  const getCategories = useCallback(async () => {
    const response = await fetch(`${BASE_URL}/categories`, {
        cache: "force-cache"
    });
    const data = await response.json();
    const formattedData: INavItem[] = data.map((item: any) => ({
      title: item.title,
      icon: item.thumbnail,
      slug: item.slug
    }));
    setNavItems(formattedData);
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const renderLoginButton = useCallback(() => {
    if (access_token) {
      return (
        <NavbarDropdown />
      )
    }
    return (
      <a href="/dang-nhap" className="flex justify-end items-center">
            <IoLogIn />
            <span>
                Đăng nhập
            </span>
        </a>
    )
  }, [access_token]);

  return (
    <nav className="w-full bg-[#ffd400] py-3">
      <div className="header__top">
        <div className="flex items-center max-w-[1120px] mx-auto mb-2">
            <Image src={logo} alt="logo" width={100} height={50} />
            <SearchBar />
        </div>
      </div>
      <div className="header-main">
        <div className="max-w-[1120px] mx-auto my-0 flex items-center">
          <ul className="flex items-center justify-between flex-[0_0_80%]">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link href={`/danh-muc/${item.slug}`} className="flex items-center">
                    <Image
                    src={item.icon}
                    alt={item.title}
                    width={20}
                    height={20}
                    />
                    <span className="ml-2">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="navbar-action text-right flex-[0_0_20%]">
            {renderLoginButton()}
          </div>
        </div>
      </div>
    </nav>
  );
};
