import Image from "next/image"
import Link from "next/link"

import { IPostItem } from "@/libs/store/postsSlice"

export const PostItemVertical: React.FC<IPostItem> = ({
  title,
  cover_photo,
  created_at,
  slug,
  user: {
    username,
    avatar
  }
}) => {
  return (
    <Link href={`/bai-viet/${slug}`} className="first:pt-0">
      <article className="post-item-vertical p-6 hover:bg-[#eaeaea]">
        <div className="mb-4 rounded">
          <Image src={cover_photo} alt={title} width={272} height={181} />
        </div>
        <div className="post-item-info">
          <div className="flex flex-wrap mb-3 text-xs">
            <div>
              {username}
            </div>
            <div className="ml-2">
              {created_at}
            </div>
          </div>
          <h3 className="text-base text-[#141414] font-semibold">
            {title}
          </h3>
        </div>
      </article>
    </Link>
  )
}