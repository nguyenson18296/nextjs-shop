import { useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosLink } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import cx from 'classnames';
import { useRouter } from 'next/router';

import { IProductDetail } from "./RelatedPosts";
import { useCopyToClipboard } from "@/libs/hooks/useCopy";

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
  const [isHovering, setIsHovering] = useState(false);
  const [copiedText, setCopyValue, copy] = useCopyToClipboard();

  const onHover = useCallback(() => {
    setIsHovering(true);
  }, []);

  const onLeaveHover = useCallback(() => {
    setIsHovering(false);
    setCopyValue('');
  }, [setCopyValue]);

  const onCopy = useCallback((text: string) => {
    copy(text);
  }, [copy]);

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
      <div className="w-full relative mt-3 flex justify-between max-w-[16rem]">
        <div />
        <div className="relative flex items-center">
          <button className="p2 w-[40px] flex items-center justify-center h-[40px] hover:bg-[#f4f4f4]">
            <CiBookmark className="w-[24px] h-[24px]" />
          </button>
          <button onClick={() => onCopy(`${window.location.origin}/bai-viet/${slug}`)} onMouseOver={onHover} onMouseLeave={onLeaveHover} className="p2 w-[40px] relative flex items-center justify-center h-[40px] hover:bg-[#f4f4f4]">
            <IoIosLink className="w-[24px] h-[24px]" />
            <div id="tooltip-copy-link" role="tooltip" 
              className={cx(
                "absolute z-10 bottom-[45px] w-max inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700",
                {
                  'invisible opacity-0': !isHovering
                })}>
                  {copiedText ? (
                    <span id="success-tooltip-message">Copied!</span>
                  ) : (
                    <span id="default-tooltip-message">Copy to clipboard</span>
                  )}
                  <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
          </button>
        </div>
      </div>
    </div>
  );
};
