"use client";
import React, { useCallback, useState } from "react";
import cx from "classnames";
import {
  MdDescription,
  MdOutlineRateReview,
  MdOutlineLocalShipping,
  MdOutlineSell,
} from "react-icons/md";

import { ITab, Tabs } from "@/components/common/Tabs/Tabs";
import {
  IComment,
  ReviewProduct,
} from "@/components/ReviewProduct/ReviewProduct";

const LIST_TABS = [
  {
    name: "Description",
    key: "description",
    icon: <MdDescription />,
  },
  {
    name: "Reviews",
    key: "reviews",
    icon: <MdOutlineRateReview />,
  },
  {
    name: "Shipping",
    key: "shipping",
    icon: <MdOutlineLocalShipping />,
  },
  {
    name: "About seller",
    key: "sellers",
    icon: <MdOutlineSell />,
  },
];

interface IDescription {
  description: string;
}

const Description: React.FC<IDescription> = ({ description }) => {
  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: description }} />;
};

interface IProductDescription {
  id: number;
  description: string;
  comments: IComment[];
}

export const ProductDescription: React.FC<IProductDescription> = ({
  id,
  description,
  comments,
}) => {
  const [selectedTab, setSelectedTab] = useState<ITab>(LIST_TABS[0]);

  const onSelectTab = useCallback((tab: ITab) => {
    setSelectedTab(tab);
  }, []);

  const renderTabContent = useCallback(() => {
    switch (selectedTab.key) {
      case "description":
        return <Description description={description} />;
      case "reviews":
        return <ReviewProduct product_id={id} comments={comments} />;
    }
  }, [selectedTab.key, description, id, comments]);

  return (
    <div
      className={cx(
        "product-description-wrapper mt-4",
        "bg-white items-start",
        "border border-2 border-[#e5e7eb]",
        "p-4 w-full",
        "flex-[0_0_70%]"
      )}
    >
      <Tabs
        tabs={LIST_TABS}
        activeTab={selectedTab}
        onSelectTab={onSelectTab}
      />
      <div className="mt-2 min-h-[200px] h-[calc(100%-50px)] relative">
        {renderTabContent()}
      </div>
    </div>
  );
};
