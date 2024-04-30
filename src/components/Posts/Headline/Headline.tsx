"use client"
import { useState, useEffect, useMemo } from "react"
import Image from "next/image";
import Link from "next/link";

import { IPostItem } from "@/libs/store/postsSlice"
import { PostItemVertical } from "@/components/Posts/Headline/PostItemVertical";
import { PostItemHorizontal } from "./PostItemHorizontal";

interface IHeadline {
  posts: IPostItem[];
}

export const Headline: React.FC<IHeadline> = ({
  posts
}) => {
  const [topPost, setTopPost] = useState<IPostItem>();
  const [otherTopPosts, setOtherTopPosts] = useState<IPostItem[]>([]);

  useEffect(() => {
    if (posts) {
      const priority_posts = posts.filter(item => item.priority === 1)
      const top = priority_posts[Math.floor(Math.random() * priority_posts.length)];
      const others = priority_posts.splice(0, 3);
      setTopPost(top)
      setOtherTopPosts(others);
    }
  }, [posts]);

  const restPosts = useMemo(() => posts.filter(item => item.priority === 0).splice(0, 5), [posts]);

  return (
    <div className="w-full pt-6">
      <div className="flex w-full flex-wrap">
        <div className="w-full lg:w-2/5 xl:w-2/4 order-none lg:order-1 p-6">
          <Link href={`/bai-viet/${topPost?.slug}`}>
            <Image src={topPost?.cover_photo || ''} alt={topPost?.title || ''} width={500} height={300} className="w-full h-auto mb-3" />
            <h1 className="text-3xl font-semibold color-[#141414]">
                {topPost?.title}
              </h1>
              <p className="mt-3 break-words text-[#404040]">
                {topPost?.short_description}
              </p>
            </Link>
          </div>
        <div className="w-full md:w-1/2 lg:w-30% xl:w-1/4 lg:order-0">
          {otherTopPosts.map(post => (
            <PostItemVertical key={post.id} {...post} />
          ))}
        </div>
        <div className="w-full md:w-1/2 lg:w-30% xl:w-1/4 lg:order-2">
          {restPosts.map(post => (
            <PostItemHorizontal key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  )
}
