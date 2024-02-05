import React, { useCallback, useState } from "react";
import cx from "classnames";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

interface IFilterSectionItem {
  sectionName: string;
  children: React.ReactNode;
}

export const FilterSectionItem: React.FC<IFilterSectionItem> = ({
  sectionName,
  children,
}) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const onToggleCollapse = useCallback(() => {
    setIsCollapse((prevState) => !prevState);
  }, []);

  return (
    <div className="filter-bar-section-item">
      <hr className="h-0.5" />
      <div
        className={cx(
          "filter-item-header",
          "flex items-center justify-between",
          "cursor-pointer py-2"
        )}
        onClick={onToggleCollapse}
      >
        <h4 className="text-base font-semibold">{sectionName}</h4>
        {isCollapse ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {isCollapse ? children : <></>}
    </div>
  );
};
