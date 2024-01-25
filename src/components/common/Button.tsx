import { ButtonHTMLAttributes } from "react";
import cx from 'classnames';

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    name,
    className,
    type = 'button',
    ...props
}) => {
    return (
        <button
            className={cx(
                className,
                "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            )}
            type={type}
            name={name}
            {...props}
        >
            {name}
        </button>
    )
}