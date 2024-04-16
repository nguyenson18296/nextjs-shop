import Link from "next/link"
import Image from 'next/image';

import { IProductDetail } from './RelatedPosts';

type IRelatedPostItem = Pick<IProductDetail, 'cover_photo' | 'title' | 'user' | 'short_description' | 'slug'>

export const RelatedPostItem: React.FC<IRelatedPostItem> = ({
  cover_photo,
  short_description,
  title,
  user,
  slug
}) => {
  return (
    <Link href={`/bai-viet/${slug}`} className="related-post-item ">
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
          <h2 className="text-xl font-semibold">
            {title}
          </h2>
          <p className="mt-2 text-base">
            {short_description}
          </p>
        </div>
      </div>
    </Link>
  )
}