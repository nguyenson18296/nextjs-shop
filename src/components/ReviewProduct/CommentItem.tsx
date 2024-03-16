import { useMemo } from 'react';
import cx from 'classnames';
import { FaReply } from "react-icons/fa";
import Image from 'next/image';
import dayjs from 'dayjs';

import { DEFAULT_AVATAR_URL } from '../../constants/index';

interface ICommentItem {
  is_reply_comment?: boolean;
  id: number;
  username: string;
  date: string;
  content: string;
  src?: string;
  onReplyComment?: (e: React.BaseSyntheticEvent) => void;
}

export const CommentItem: React.FC<ICommentItem> = ({
  is_reply_comment,
  id,
  username,
  date,
  content,
  src,
  onReplyComment,
}) => {

  const getAvatar = useMemo(() => {
    if (src) {
      return src;
    }
    return DEFAULT_AVATAR_URL;
  }, [src]);

  return (
    <article className={cx(
      `comment-item py-3 px-2 odd:bg-white even:bg-slate-50 mt-2 comment-${id} flex items-start border border-[#e5dddd] rounded-md`,
      {
        'px-2': is_reply_comment
      }
    )}>
      <Image alt='avatar' src={getAvatar} width={40} height={40} />
     <div className='ml-2'>
      <div className="flex items-center">
          <span className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">{username}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
              <time>
                  {dayjs(date).format("DD-MM-YYYY HH:mm:ss")}
              </time>
          </span>
          </div>
        <div className="comment-content">{content}</div>
        {!is_reply_comment && (
          <div className="flex items-center mt-4 space-x-4">
            <button onClick={onReplyComment} type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
              <FaReply />
              <span className="ml-1">Trả lời</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
