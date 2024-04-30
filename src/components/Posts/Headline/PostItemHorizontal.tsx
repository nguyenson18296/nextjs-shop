import Image from "next/image";
import Link from "next/link";

import { IPostItem } from "@/libs/store/postsSlice";

export const PostItemHorizontal: React.FC<IPostItem> = ({
  title,
  cover_photo,
  created_at,
  slug,
  user: { username, avatar },
}) => {
  return (
    <Link href={`/bai-viet/${slug}`} className="first:pt-0 p-6">
      <article className="post-item-horizontal">
        <div className="post-metadata text-xs">
          <div className="flex flex-wrap mb-3">
            <div>{username}</div>
            <div className="ml-2">{created_at}</div>
          </div>
        </div>
        <div className="post-item-content flex items-start">
          <div className="w-4/5">
            <h3 className="text-lg break-words text-[#141414] font-semibold">
              {title}
            </h3>
          </div>
          <div className="min-w-[64px] ml-4 w-1/5 rounded">
            <Image src={cover_photo} alt={title} width={64} height={64} className="h-[64px]" />
          </div>
        </div>
      </article>
    </Link>
  );
};
