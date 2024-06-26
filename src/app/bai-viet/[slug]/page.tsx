/* eslint-disable react/no-danger */
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { BASE_URL } from "@/constants";
import {
  RelatedPosts,
  IProductDetail,
} from "@/components/Posts/RelatedPosts/RelatedPosts";
import { Navbar } from "@/components/common/Navbar";
import placeholderAvatar from '@/assets/placeholder-avatar.jpeg'

const inter = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface IProducts {
  params: {
    slug: string;
  };
}

export default async function Page({ params: { slug } }: IProducts) {
  const items = (await getData(slug)) as IProductDetail;

  const formatDate = (date: string) => new Date(date).toString();

  return (
    <>
      <Navbar />
      <div className={inter.className}>
        <div className="post-wrapper max-w-[960px] my-0 mx-auto pb-20">
          <h1 className="my-10 max-w-[680px] mx-auto text-4xl">
            {items.title}
          </h1>
          <div className="short-description max-w-[680px] mx-auto py-6 text-xl font-normal color-[#808080] border-y border-[#e6e6e6]">
            {items.short_description}
          </div>
          <div className="flex max-w-[680px] mx-auto items-center justify-between">
            <Link href={`/bai-viet/tac-gia/${items.user.username}?tab=posts`}>
              <div className="mr-[100px] my-[50px] flex items-center">
                <Image
                  width={24}
                  height={24}
                  src={items.user.avatar || placeholderAvatar}
                  alt={items.user.username}
                  className="rounded mr-2"
                />
                <span className="text-sm">{items.user.username}</span>
              </div>
            </Link>
            <div className="flex items-center flex-wrap">
              <div className="my-1 text-sm color-[#808080]">
                {formatDate(items.created_at)}
              </div>
            </div>
          </div>
          <div className="py-6 border-y border-[#e6e6e6]">
            <Image
              alt={items.title}
              src={items.cover_photo}
              width="0"
              height="0"
              sizes="100vw"
              className="min-w-[960px] h-auto"
            />
          </div>
          <div
            className="my-4 mx-auto max-w-[680px]"
            dangerouslySetInnerHTML={{ __html: items.content }}
          />
        </div>
        <div className="mt-[64px] w-full bg-[#d9d9d9] h-[1px]" />
        <RelatedPosts />
      </div>
    </>
  );
}

async function getData(slug: string) {
  const res = await fetch(`${BASE_URL}/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
