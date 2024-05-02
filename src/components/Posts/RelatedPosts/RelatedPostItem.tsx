import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosLink } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";

import { IProductDetail } from "./RelatedPosts";
import { CopyButton } from "@/components/CopyButton/CopyButton";

type IRelatedPostItem = Pick<
  IProductDetail,
  "cover_photo" | "title" | "user" | "short_description" | "slug"
>;

export const RelatedPostItem: React.FC<IRelatedPostItem> = ({
  cover_photo,
  short_description,
  title,
  user,
  slug,
}) => {
  return (
    <div className="related-post-item">
      <Link href={`/bai-viet/${slug}`}>
        <div className="px-6">
          <div className="media-wrapper mb-4 rounded">
            <Image
              alt={title}
              src={cover_photo}
              width={300}
              height={300}
              className="w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2 text-base">{short_description}</p>
          </div>
        </div>
      </Link>
      <div className="w-full relative mt-3 flex justify-between">
        <div />
        <div className="relative flex items-center">
          <button className="p2 w-[40px] flex items-center justify-center h-[40px] hover:bg-[#f4f4f4]">
            <CiBookmark className="w-[24px] h-[24px]" />
          </button>
          <CopyButton
            Icon={<IoIosLink className="w-[24px] h-[24px]" />}
            copyLink={`${window.location.origin}/bai-viet/${slug}`}
          />
        </div>
      </div>
    </div>
  );
};
