"use client"

import cx from 'classnames';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { PostItem } from "@/app/bai-viet/PostItem"
import { IPostItem } from "@/libs/store/postsSlice";

interface IUserPostsList {
  username: string;
  posts: IPostItem[];
}

export const UserPostsList: React.FC<IUserPostsList> = ({
  username,
  posts
}) => {
  const searchParams = useSearchParams()

  const search = searchParams.get('tab')

  return (
    <div className="flex flex-1 relative py-8 px-6">
      <div className="h-full w-[250px] relative">
        <div className="sticky">
          <div className="px-6">
            <div className="p-3 text-xs text-[#808080]">
              Thông tin
            </div>
            <Link href={`/bai-viet/tac-gia/${username}?tab=posts`}>
              <div className={cx(
                "text-base p-3 cursor-pointer hover:bg-[#efecec]",
                {
                  "font-semibold bg-[#ffd400]": search === 'posts'
                }
              )}>
                Bài viết
              </div>
            </Link>
            <Link href={`/bai-viet/tac-gia/${username}?tab=about`}>
              <div className={cx(
                "text-base p-3 cursor-pointer hover:bg-[#efecec]",
                {
                  "font-semibold bg-[#ffd400]": search === 'about'
                }
              )}>
                Cá nhân
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[920px]">
        <div className="w-[728px] mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Posts by {username}
            </h2>
          </div>
          {posts.map(post => (
            <PostItem key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  )
}
