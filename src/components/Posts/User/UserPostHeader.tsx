"use client";
import React, { useCallback, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import Image from "next/image";
import cx from "classnames";

import { IUser } from "@/types/users.type";
import { useCopyToClipboard } from "@/libs/hooks/useCopy";
import { CopyButton } from "@/components/CopyButton/CopyButton";

import placeholderAvatar from '@/assets/placeholder-avatar.jpeg';

export const UserPostHeader: React.FC<IUser> = ({
  avatar,
  username,
  email,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [copiedText, setCopyValue, copy] = useCopyToClipboard();

  const onHover = useCallback(() => {
    setIsHovering(true);
  }, []);

  const onLeaveHover = useCallback(() => {
    setIsHovering(false);
    setCopyValue("");
  }, [setCopyValue]);

  const onCopy = useCallback(
    (text: string) => {
      copy(text);
    },
    [copy]
  );

  return (
    <>
      <div className="px-6 py-10">
        <div className="flex items-start justify-between">
          <div className="w-[128px] h-[128px] rounded-full">
            <div className="flex items-center">
              <Image
                src={avatar || placeholderAvatar}
                alt={username}
                width={128}
                height={128}
                className="rounded-full"
              />
              <div className="user-info ml-6">
                <h2 className="font-bold text-4xl">{username}</h2>
                <span>{email}</span>
              </div>
            </div>
          </div>
          <CopyButton
            Icon={<FaShareAlt />}
            buttonText="Chia sẻ"
            copyLink={window.location.href}
          />
        </div>
      </div>
      <div className="w-full h-px bg-[#d9d9d9]" />
    </>
  );
};
