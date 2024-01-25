import { IconType } from "react-icons/lib";

interface IIconProps {
  classNames?: string;
  fill?: string;
  DynamicIcon: IconType;
}

export const IconCustom: React.FC<IIconProps> = ({
  DynamicIcon,
  classNames,
  fill,
}) => {
  return (
    <>
      <DynamicIcon className={classNames} fill={fill} />
    </>
  );
};
