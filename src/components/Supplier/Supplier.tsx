import React from "react";
import { TbWorld } from "react-icons/tb";
import { FaFlagUsa } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";

export const Supplier: React.FC = () => {
  return (
    <div className="supplier border border-[#e5e7eb] p-2 flex-[0_0_30%]">
      <div className="flex items-start">
        <div className="w-[50px] h-[50px] rounded text-2xl font-bold text-[#7dc5c5] bg-[#c5f3f0] flex items-center justify-center">
          R
        </div>
        <div className="supplier-name ml-4">
          <div>Supplier</div>
          <div>Guanjoi Trading LLC</div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="mt-2 mb-3">
        <div className="flex items-center">
          <div className="flex-[0_0_10%]">
            <FaFlagUsa />
          </div>
          <div className="text-[#8b96a4]">Germany, Berlin</div>
        </div>
        <div className="flex items-center">
          <div className="flex-[0_0_10%]">
            <MdOutlineVerifiedUser />
          </div>
          <div className="text-[#8b96a4]">Verified Seller</div>
        </div>
        <div className="flex items-center">
          <div className="flex-[0_0_10%]">
            <TbWorld />
          </div>
          <div className="text-[#8b96a4]">Worldwide shipping</div>
        </div>
      </div>
    </div>
  );
};
