"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoLogIn } from "react-icons/io5";

import { BASE_URL } from "@/constants";

interface INavItem {
  title: string;
  icon: string;
  slug: string;
}

export const Navbar: React.FC = () => {
  const [navItems, setNavItems] = useState<INavItem[]>([]);

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

  return (
    <nav className="w-full bg-[#ffd400] py-3">
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
            <a href="/dang-nhap" className="flex justify-end items-center">
                <IoLogIn />
                <span>
                    Đăng nhập
                </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
