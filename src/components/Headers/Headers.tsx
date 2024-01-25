import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

import { InputSearch } from "../InputSearch/InputSearch";
import { HeaderMenu } from "./HeaderMenu";

export const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center">
            <a className="text-2xl font-bold">
                Exclusive
            </a>
            <HeaderMenu />
            <div className="action-bar flex items-center">
                <InputSearch
                    name="search"
                    placeholder="What are you looking for?"
                />
                <FaHeart className="ml-6" />
                <FaCartShopping className="ml-4" />
            </div>
        </header>
    )
}