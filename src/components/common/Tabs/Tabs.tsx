import React, { useCallback, useMemo } from "react";
import cx from "classnames";

export interface ITab {
  name: string;
  key: string;
  icon?: React.ReactNode;
}

interface ITabs {
  tabs: ITab[];
  activeTab: ITab;
  onSelectTab: (tab: ITab) => void;
}

export const Tabs: React.FC<ITabs> = ({ tabs, activeTab, onSelectTab }) => {

  const renderTab = useCallback((tab: ITab) => {
    const classNames = cx("inline-flex items-center justify-center p-4 group me-2", {
      'border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300': activeTab.key !== tab.key,
      'text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500': activeTab.key === tab.key
    });
    return (
        <li key={tab.key} className={classNames} onClick={() => onSelectTab(tab)}>
            <span className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300">
                {tab.icon}
            </span>
            {tab.name}
        </li>
    );
  }, [onSelectTab, activeTab]);

  const renderTabs = useMemo(
    () => tabs.map((item) => renderTab(item)),
    [renderTab, tabs]
  );

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            {renderTabs}
        </ul>
    </div>
  )
};
