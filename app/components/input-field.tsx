"use client";

import { forwardRef } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string; // Error message as a string
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, ...inputProps }, ref) => {
    return (
      <div className={"mb-5"}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
          {label}
        </label>
        <input
          ref={ref}
          className={`bg-gray-50 border mb-5 ${
            error ? "border-red-500" : "border-gray-300"
          } text-gray-900 text-sm mb-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          {...inputProps} // Spread all other props
        />
      </div>
    );
  }
);

InputField.displayName = "InputField"; // Set display name for debugging

export default InputField;
