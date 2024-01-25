import { InputHTMLAttributes } from "react"
import { FaDiscourse } from "react-icons/fa6";

export const InputSearch: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
    name,
    placeholder,
    ...props
}) => {
    return (
        <div className="relative">
            <input
                autoComplete="off"
                className="py-3 px-2 pr-6 bg-[#F5F5F5] text-xs"
                name={name}
                placeholder={placeholder}
                style={{
                    width: 220,
                    height: 24
                }}
                {...props} 
            />
            <FaDiscourse className="absolute end-1.5 bottom-1" />
        </div>
    )
}