import React, { forwardRef, useCallback, useState } from "react";
import Image from "next/image";
import cx from 'classnames'

import { Button } from "../common/Button";

export type Ref = HTMLTextAreaElement;

interface ICommentTextArea {
    parent_comment_id?: number;
    classNames?: string;
    onSubmitComment: (content: string, parent_comment_id?: number) => void;
}

export const CommentTextArea = forwardRef<Ref, ICommentTextArea>(({ classNames, parent_comment_id, onSubmitComment }, ref) => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [text, setText] = useState("");

    const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setText(value);
    }, []);

    const onSubmit = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();
        if (parent_comment_id) {
            onSubmitComment(text, parent_comment_id);
            return setText('')
        }
        onSubmitComment(text);
        return setText('');
    }, [onSubmitComment, text, parent_comment_id]);

    return (
        <form className={cx("write-review-section", classNames)}>
            <div className="flex items-start">
                <Image alt={user.username} src={user.avatar} width={50} height={50} />
                <textarea
                value={text}
                ref={ref}
                id="message"
                rows={4}
                className="block ml-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Viết đánh giá"
                onChange={onChange}
                ></textarea>
            </div>
            <Button onClick={onSubmit} name="Gửi" type="submit" className="mt-2 float-right" />
            <div className="clear-both" />
        </form>
    )
})

CommentTextArea.displayName = "CommentTextArea";
