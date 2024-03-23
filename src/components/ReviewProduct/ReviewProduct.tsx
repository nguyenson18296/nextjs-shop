import { useCallback, useState, useRef } from "react";

import { CommentItem } from "./CommentItem";
import { CommentTextArea } from "./CommentTextArea";
import { IUser } from "@/types/users.type";
import { BASE_URL } from "@/constants";
import { Modal } from "../common/Modal";
import { remove } from "@/utils/utils";

export interface IComment {
  id: number;
  content: string;
  created_at: string;
  user: IUser;
  replies: IComment[];
}

interface IReviewProduct {
  product_id: number;
  comments: IComment[];
}

export const ReviewProduct: React.FC<IReviewProduct> = ({
  product_id,
  comments,
}) => {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const [isReplyComment, setIsReplyComment] = useState<boolean>(false);
  const [activeReplyForm, setActiveReplyForm] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const textarea = useRef<(HTMLTextAreaElement | null)[]>([]);

  const [userComments, setUserComments] = useState(comments);
  const [selectedParentCommentId, setSelectedParentCommentId] = useState(0);
  const [selectedCommentId, setSelectedCommentId] = useState(0);

  const onReplyComment = useCallback(
    (_e: React.BaseSyntheticEvent, index: number) => {
      setIsReplyComment(true);
      setActiveReplyForm(index);
      setTimeout(() => {
        if (textarea.current[index]) {
          textarea.current[index]?.focus(); // Accessing the value of the textarea at 'index'
        }
      }, 100);
    },
    []
  );

  const onSubmitComment = useCallback(
    async (content: string, parent_comment_id?: number) => {
      try {
        let formData = {};
        if (parent_comment_id) {
          formData = {
            user_id: +user.id,
            content,
            parent_comment_id,
          };
        } else {
          formData = {
            user_id: +user.id,
            content,
            product_id,
          };
        }
        const data = await fetch(`${BASE_URL}/product-reviews`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const response = await data.json();
        const formatComment = {
          id: response.id,
          content: response.content,
          created_at: response.created_at,
          user: {
            id: response.user.username,
            email: response.user.email,
            username: response.user.username,
            avatar: response.user.avatar,
          },
          replies: [],
        };
        if (parent_comment_id) {
          const cloneArr = [...userComments];
          const foundIndex = cloneArr.findIndex(
            (comment) => comment.id === parent_comment_id
          );
          if (foundIndex !== -1) {
            cloneArr[foundIndex].replies.push(formatComment);
            setUserComments(cloneArr);
          }
        } else {
          const newArrComments = [...userComments].concat(formatComment);
          setUserComments(newArrComments);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [product_id, userComments, user]
  );

  const onEditComment = useCallback((async (content: string, comment_id?: number, parent_comment_id?: number) => {
    try {
      let formData = {
        content
      };
      await fetch(`${BASE_URL}/product-reviews/${comment_id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const cloneComments = [...userComments];
      const foundIndex = cloneComments.findIndex(
        (comment) => comment.id === parent_comment_id
      );
      if (foundIndex !== -1) {
          const updatedChildIndex = cloneComments[foundIndex].replies.findIndex(item => item.id === comment_id);
          if (updatedChildIndex !== -1) {
            cloneComments[foundIndex].replies[updatedChildIndex].content = content
          }
      } else {
        const indexParent = cloneComments.findIndex(item => item.id === comment_id);
        if (indexParent !== -1) {
          cloneComments[indexParent].content = content;
        }
      }
      setUserComments(cloneComments);
    } catch (e) {
      console.error(e);
    }
  }), [userComments])

  const onCloseModal = useCallback(() => {
    setOpenDeleteModal(false);
    setSelectedCommentId(0);
  }, []);

  const onOpenDeleteModal = useCallback((parent_id: number, comment_id?: number) => {
    setOpenDeleteModal(true);
    setSelectedParentCommentId(parent_id)
    if (comment_id) {
      setSelectedCommentId(comment_id);
    }
  }, []);

  const onDeleteComment = useCallback(async () => {
    try {
      await fetch(`${BASE_URL}/product-reviews/${selectedCommentId}`, {
        method: "DELETE",
      });
      const foundedParentComment = userComments.findIndex(comment => comment.id === selectedParentCommentId);
      if (selectedCommentId && foundedParentComment !== -1) {
        let replies = [...userComments[foundedParentComment].replies];
        remove(replies, item => item.id === selectedCommentId)
        const arr = userComments.map(comment => {
          if (comment.id !== selectedParentCommentId) {
            return comment
          }
          return {
            ...comment,
            replies
          }
        })
        setUserComments(arr);
      }
      setOpenDeleteModal(false);
    } catch (e) {
      console.error(e);
    }
  }, [selectedCommentId, userComments, selectedParentCommentId]);

  return (
    <>
      <Modal
        headerText="Xoá bình luận"
        showFooter
        open={openDeleteModal}
        onCancel={onCloseModal}
        onSubmit={onDeleteComment}
      >
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          Bạn muốn xoá review này?
        </p>
      </Modal>
      <div className="review-product w-full">
        {userComments.length > 0 ? (
          <div className="comments min-h-[300px]">
            {userComments.map((item, index) => (
              <div
                key={item.id}
              >
                <CommentItem
                  id={item.id}
                  username={item.user.username}
                  date={item.created_at}
                  content={item.content}
                  onReplyComment={(e: React.BaseSyntheticEvent) =>
                    onReplyComment(e, index)
                  }
                  onOpenDeleteModal={() => onOpenDeleteModal(item.id)}
                  onSubmitComment={onEditComment}
                />
                <div className="ml-6">
                  {item.replies.length > 0 &&
                    item.replies.map((itemReplies) => (
                      <CommentItem
                        is_reply_comment={true}
                        key={itemReplies.id}
                        id={itemReplies.id}
                        parent_comment_id={item.id}
                        username={itemReplies.user.username}
                        date={itemReplies.created_at}
                        content={itemReplies.content}
                        onOpenDeleteModal={() =>
                          onOpenDeleteModal(item.id, itemReplies.id)
                        }
                        onSubmitComment={onEditComment}
                      />
                    ))}
                  {isReplyComment && activeReplyForm === index && (
                    <CommentTextArea
                      parent_comment_id={item.id}
                      classNames="mt-2"
                      ref={(el) => (textarea.current[index] = el)}
                      onSubmitComment={onSubmitComment}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="comments min-h-[300px] flex items-center justify-center">
            Hiện tại sản phẩm chưa có đánh giá
          </div>
        )}
        <CommentTextArea classNames="mt-4" onSubmitComment={onSubmitComment} />
      </div>
    </>
  );
};
