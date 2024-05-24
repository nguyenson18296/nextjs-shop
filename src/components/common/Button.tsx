import { ButtonHTMLAttributes, ReactElement, ReactNode, useMemo } from "react";
import cx from 'classnames';

enum ButtonEnum {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    DANGER = 'danger',
    WARNING = 'warning'
}

type ButtonType = `${ButtonEnum}`;

interface IButton {
    children?: ReactNode;
    buttonType?: ButtonType
}

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement> & IButton> = ({
    buttonType = 'primary',
    name,
    className,
    type = 'button',
    children,
    ...props
}) => {
    const getButtonClasses = useMemo(() => {
        switch(buttonType) {
            case ButtonEnum.SECONDARY:
                return 'py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700';
            case ButtonEnum.DANGER:
                return 'focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900';
            case ButtonEnum.WARNING:
                return 'focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900';
            default:
                return 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        }
    }, [buttonType]);

    return (
        <button
            className={cx(
                className,
                getButtonClasses
            )}
            type={type}
            name={name}
            {...props}
        >
            {children || name}
        </button>
    )
}