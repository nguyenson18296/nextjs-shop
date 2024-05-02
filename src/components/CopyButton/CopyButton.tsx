import { useCallback, useState } from "react";
import cx from 'classnames';

import { useCopyToClipboard } from "@/libs/hooks/useCopy";

interface ICopyButton {
  Icon: React.ReactNode;
  copyLink: string;
  buttonText?: string;
}

export const CopyButton: React.FC<ICopyButton> = ({
  copyLink,
  buttonText,
  Icon
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
    <button onClick={() => onCopy(copyLink)} onMouseOver={onHover} onMouseLeave={onLeaveHover} className="share-button relative p-2 hover:bg-[#0000000d] cursor-pointer rounded flex items-center">
      {Icon}
      {buttonText && (
        <span className="ml-1 text-sm">
          {buttonText}
        </span>
      )}
      <div id="tooltip-copy-link" role="tooltip" 
        className={cx(
          "absolute z-10 bottom-[45px] w-max inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700",
          {
            'invisible opacity-0': !isHovering,
            'left-[-50%]': !copiedText,
            'left-[0px]': copiedText
          })}>
            {copiedText ? (
              <span id="success-tooltip-message">Copied!</span>
            ) : (
              <span id="default-tooltip-message">Copy to clipboard</span>
            )}
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </button>
  )
}