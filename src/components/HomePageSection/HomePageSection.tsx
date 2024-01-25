import { ReactNode } from "react"
import cx from 'classnames';

interface IHomePageSection {
    classNames?: string;
    name: string;
    renderHeader?: ReactNode;
    renderContent?: ReactNode;
}

export const HomePageSection: React.FC<IHomePageSection> = ({
    classNames,
    name,
    renderHeader,
    renderContent
}) => {
    return (
        <div className={cx(
            classNames,
            "page-section-item"
        )}>
            <div className="section-title flex">
                <div className="w-[20px] h-[40px] bg-[#DB4444] mr-4 rounded" />
                <h3 className="text-[#DB4444] font-bold ">
                    {name}
                </h3>
            </div>
            <div className="header mt-6">
                    {renderHeader}
                </div>
                <div className="header mt-10">
                    {renderContent}
                </div>
        </div>
    )
}
