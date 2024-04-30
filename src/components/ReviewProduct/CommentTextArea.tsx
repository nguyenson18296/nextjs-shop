import React, { forwardRef, useCallback, useState } from "react";
import Image from "next/image";
import cx from "classnames";
import { IoCloseCircle } from "react-icons/io5";

import { Button } from "../common/Button";
import { DragDropImageZone } from "./DragDropImageZone";
import { KeyboardNameEnum } from "@/constants/types";

export type Ref = HTMLTextAreaElement;

interface ICommentTextArea {
  isEditMode?: boolean;
  comment_id?: number;
  parent_comment_id?: number;
  classNames?: string;
  value?: string;
  onSubmitComment?: (content: string, parent_comment_id?: number) => void;
  onEditComment?: (
    content: string,
    comment_id?: number,
    parent_comment_id?: number
  ) => void;
  setIsEdit?: (edit: boolean) => void;
}

export const CommentTextArea = forwardRef<Ref, ICommentTextArea>(
  (
    {
      isEditMode,
      classNames,
      value,
      comment_id,
      parent_comment_id,
      onEditComment,
      onSubmitComment,
      setIsEdit,
    },
    ref
  ) => {
    const user = JSON.parse(localStorage.getItem("user") || "");
    const [text, setText] = useState(value ?? "");
    const [dragging, setDragging] = useState(false);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const onChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setText(value);
      },
      []
    );

    const onCancel = useCallback(() => {
      setIsEdit?.(false);
    }, [setIsEdit]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === KeyboardNameEnum.ESCAPE) {
          setIsEdit?.(false);
        }
      },
      [setIsEdit]
    );

    const onSubmit = useCallback(
      (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (parent_comment_id) {
          onSubmitComment?.(text, parent_comment_id);
          return setText("");
        }
        onSubmitComment?.(text);
        return setText("");
      },
      [onSubmitComment, text, parent_comment_id]
    );

    const onEdit = useCallback(
      (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (parent_comment_id) {
          onEditComment?.(text, comment_id, parent_comment_id);
          setIsEdit?.(false);
          return setText("");
        }
        onEditComment?.(text, comment_id);
        setIsEdit?.(false);
        return setText("");
      },
      [onEditComment, setIsEdit, comment_id, parent_comment_id, text]
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.dataTransfer.setData("text/plain", ""); // Required for Firefox
      setDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
      setDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const files = e.dataTransfer.files; // Get the dropped file
      console.log("files", files);
      if (files) {
        // const previewImage = URL.createObjectURL(file);
        // setPreviewImages(previewImage);
        let src: string[] = [];
        Array.from(files).forEach(file => {
          const previewImage = URL.createObjectURL(file);
          src.push(previewImage);
        })
        console.log("src", src);
        setPreviewImages(src);
      }
    }, []);

    if (dragging) {
      return (
        <DragDropImageZone
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
        />
      );
    }

    return (
      <form
        className={cx("write-review-section w-full", classNames)}
        onKeyDown={handleKeyDown}
      >
        <div
          className="flex items-start"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
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
        <div className="float-right mt-2">
          <Button
            onClick={onCancel}
            name="Huỷ"
            type="button"
            buttonType="secondary"
          />
          <Button
            onClick={isEditMode ? onEdit : onSubmit}
            name="Gửi"
            type="submit"
          />
        </div>
        <div className="clear-both" />
        <div className="flex items-center">
        {previewImages.length > 0 && (
          previewImages.map(src => (
              <div
                key={src}
                className="relative first:ml-0 ml-2"
              >
                <Image
                src={src}
                alt="preview-img"
                width={80}
                height={80}
              />
              <IoCloseCircle className="absolute right-0 top-0 cursor-pointer" />
              </div>
          ))
        )}
        </div>
      </form>
    );
  }
);

CommentTextArea.displayName = "CommentTextArea";
