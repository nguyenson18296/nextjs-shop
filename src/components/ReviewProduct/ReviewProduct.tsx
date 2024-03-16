import { useCallback, useState, useRef } from "react";

import { CommentItem } from "./CommentItem";
import { CommentTextArea } from "./CommentTextArea";
import { IUser } from "@/types/users.type";
import { BASE_URL } from "@/constants";

export interface IComment {
  id: number;
  content: string;
  created_at: string;
  user: IUser;
  replies: IComment[];
}

interface IReviewProduct {
  product_id: number;
  comments: IComment[]
}

export const ReviewProduct: React.FC<IReviewProduct> = ({
  product_id,
  comments
}) => {
  const user = JSON.parse(localStorage.getItem("user") || "");
  const [isReplyComment, setIsReplyComment] = useState<boolean>(false);
  const [activeReplyForm, setActiveReplyForm] = useState(0);
  const textarea = useRef<(HTMLTextAreaElement | null)[]>([]);

  const [userComments, setUserComments] = useState(comments);

  const onReplyComment = useCallback((_e: React.BaseSyntheticEvent, index: number) => {
    setIsReplyComment(true);
    setActiveReplyForm(index);
    setTimeout(() => {
      if (textarea.current[index]) {
        textarea.current[index]?.focus(); // Accessing the value of the textarea at 'index'
      }
    }, 100);
  }, []);

  const onSubmitComment = useCallback(async (content: string, parent_comment_id?: number) => {
    try {
      let formData = {}
      if (parent_comment_id) {
        formData = {
          user_id: +user.id,
          content,
          parent_comment_id,
        }
      } else {
        formData = {
          user_id: +user.id,
          content,
          product_id
        }
      }
      const data = await fetch(`${BASE_URL}/product-reviews`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const response = await data.json();
      const formatComment = {
        id: response.id,
        content: response.content,
        created_at: response.created_at,
        user: {
          id: response.user.username,
          email: response.user.email,
          username: response.user.username,
          avatar: response.user.avatar
        },
        replies: []
      }
      if (parent_comment_id) {
        const cloneArr = [...userComments];
        const foundIndex = cloneArr.findIndex(comment => comment.id === parent_comment_id);
        if (foundIndex !== -1) {
          cloneArr[foundIndex].replies.push(formatComment);
          setUserComments(cloneArr)
        }
      } else {
        const newArrComments = [...userComments].concat(formatComment);
        setUserComments(newArrComments);
      }
    } catch (e) {
      console.error(e);
    }
  }, [product_id, userComments, user]);

  return (
    <div className="review-product w-full">
        {userComments.length > 0 ? (
          <div className="comments min-h-[300px]">
            {userComments.map((item, index) => (
              <>
                <CommentItem
                  key={item.id}
                  id={item.id}
                  username={item.user.username}
                  date={item.created_at}
                  content={item.content}
                  onReplyComment={(e: React.BaseSyntheticEvent) => onReplyComment(e, index)}
                />
                <div className="ml-6">
                  {item.replies.length > 0 && item.replies.map(itemReplies => (
                    <CommentItem
                      is_reply_comment={true}
                      key={itemReplies.id}
                      id={itemReplies.id}
                      username={itemReplies.user.username}
                      date={itemReplies.created_at}
                      content={itemReplies.content}
                    />
                  ))}
                  {(isReplyComment && activeReplyForm === index) && (
                    <CommentTextArea
                      parent_comment_id={item.id}
                      classNames="mt-2" 
                      ref={(el => textarea.current[index] = el)}
                      onSubmitComment={onSubmitComment}
                    />
                  )}
                </div>
              </>
            ))}
          </div>
        ) : (
          <div className="comments min-h-[300px] flex items-center justify-center">
              Hiện tại sản phẩm chưa có đánh giá
          </div>
        )}
      <CommentTextArea classNames="mt-4" onSubmitComment={onSubmitComment} />
    </div>
  );
};
