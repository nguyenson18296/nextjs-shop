'use client';
import Image from "next/image";
import Link from "next/link";

interface IPostItem {
  title: string;
  short_description: string;
  cover_photo: string;
  created_at: string;
  slug: string;
  user: {
    username: string;
    avatar: string;
  }
}

export const PostItem: React.FC<IPostItem> = ({
  title,
  short_description,
  cover_photo,
  created_at,
  slug,
  user: {
    username,
    avatar
  }
}) => {
  return (
    <article className="post-item max-w-[728px] pt-6 py-2 border-t">
      <div className="author-info flex items-center">
        <span>
          {username}
        </span>
        <span>
          {created_at}
        </span>
      </div>
      <div className="post-preview flex items-start">
        <div className="text-preview flex-auto">
          <h2 className="font-bold text-2xl pb-2">
            <Link href={`/bai-viet/${slug}`}>
              {title}
            </Link>
        </h2>
          <p>
            {short_description}
          </p>
        </div>
        <div className="image-preview ml-[60px]">
          {cover_photo && (
            <Image
              src={cover_photo} 
              alt={title} 
              width="0"
              height="0"
              sizes="100vw"
              className="min-w-[112px] h-auto"
            />
          )}
        </div>
      </div>
    </article>
  )
}