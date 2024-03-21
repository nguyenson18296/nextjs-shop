import { useMemo, useState, useCallback, useRef } from "react";
import cx from "classnames";
import { FaReply } from "react-icons/fa";
import Image from "next/image";
import dayjs from "dayjs";

import { CommentTextArea } from "./CommentTextArea";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { DEFAULT_AVATAR_URL } from "@/constants/index";

interface ICommentItem {
  is_reply_comment?: boolean;
  id: number;
  parent_comment_id?: number;
  username: string;
  date: string;
  content: string;
  src?: string;
  onReplyComment?: (e: React.BaseSyntheticEvent) => void;
  onOpenDeleteModal: () => void;
  onSubmitComment: (content: string, comment_id?: number, parent_comment_id?: number) => void;
}

export const CommentItem: React.FC<ICommentItem> = ({
  is_reply_comment,
  id,
  parent_comment_id,
  username,
  date,
  content,
  src,
  onReplyComment,
  onOpenDeleteModal,
  onSubmitComment
}) => {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const ref = useRef(null);
  const textarea = useRef<(HTMLTextAreaElement | null)>(null);

  const getAvatar = useMemo(() => {
    if (src) {
      return src;
    }
    return DEFAULT_AVATAR_URL;
  }, [src]);

  const onOpenDropdown = useCallback(() => {
    setOpenDropdown((open) => !open);
  }, []);

  const onSwitchToEdit = useCallback(() => {
    setIsEdit(true);
    setOpenDropdown((open) => !open);
    setTimeout(() => {
      if (textarea.current) {
        textarea.current.focus(); // Accessing the value of the textarea at 'index'
      }
    }, 100);
  }, []);

  const handleClickOutside = useCallback(() => {
    setOpenDropdown(false);
  }, []);

  useOnClickOutside(ref, handleClickOutside);

  const openDeleteModal = useCallback(() => {
    onOpenDeleteModal();
    setOpenDropdown(false);
  }, [onOpenDeleteModal]);

  return (
    <article
      className={cx(
        `comment-item py-3 px-2 odd:bg-white even:bg-slate-50 mt-2 comment-${id} flex items-start justify-between border border-[#e5dddd] rounded-md`,
        {
          "px-2": is_reply_comment,
        }
      )}
    >
      {isEdit ? (
        <CommentTextArea
          isEditMode
          comment_id={id}
          parent_comment_id={parent_comment_id}
          value={content}
          ref={textarea}
          classNames="mt-2"
          onEditComment={onSubmitComment}
          setIsEdit={setIsEdit}
        />
      ) : (
        <>
          <div className="flex items-start flex-[0_0_95%]">
            <Image alt="avatar" src={getAvatar} width={40} height={40} />
            <div className="ml-2">
              <div className="flex items-center">
                <span className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                  {username}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  <time>{dayjs(date).format("DD-MM-YYYY HH:mm:ss")}</time>
                </span>
              </div>
              <div className="comment-content">{content}</div>
              {!is_reply_comment && (
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    onClick={onReplyComment}
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                  >
                    <FaReply />
                    <span className="ml-1">Trả lời</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          {user.role === "admin" && (
            <div className="">
              <button
                onClick={onOpenDropdown}
                id="dropdownMenuIconHorizontalButton"
                data-dropdown-toggle="dropdownDotsHorizontal"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg dark:text-white relative right-[0px]"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>
              <div
                id="dropdownDotsHorizontal"
                ref={ref}
                className={cx(
                  "z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-[0px]",
                  {
                    hidden: !openDropdown,
                  }
                )}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <span
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={openDeleteModal}
                    >
                      Xoá bình luận
                    </span>
                  </li>
                  <li>
                    <span
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={onSwitchToEdit}
                    >
                      Chỉnh sửa bình luận
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </article>
  );
};
