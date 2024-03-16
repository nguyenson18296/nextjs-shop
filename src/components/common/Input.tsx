import React from "react";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  register?: any
}

export const Input: React.FC<IInputProps> = ({ label, register, type = 'text', ...props }) => {
  return (
    <div className="mt-4 first:mt-0">
      {label && (
        <label
          htmlFor={props.id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={props.id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        {...register?.(props.name)}
      />
    </div>
  );
};
