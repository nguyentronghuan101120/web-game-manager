/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form"; // Assuming you're using react-hook-form
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError; // Error message as an object from react-hook-form
  register?: any; // Register function from react-hook-form
  type?: "text" | "password" | "email"; // Allow type to be text, password, or email
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, register, type = "text", ...inputProps }, ref) => {
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev); // Toggle the state
    };

    const hasIcon = type === "password"; // Determine if the input has an icon

    return (
      <div className="mb-4 w-full">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type={hasIcon && !showPassword ? "password" : "text"} // Toggle input type
            className={`bg-gray-50 border mb-2 ${
              error ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              hasIcon ? "pr-10" : ""
            } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} // Added pr-10 conditionally based on icon presence
            {...(register ? register : {})} // Spread the register if present
            {...inputProps} // Spread all other props
          />
          {hasIcon && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />} {/* Toggle icon */}
            </button>
          )}
        </div>
        {error && <span className="text-red-500 text-sm">{error.message}</span>}{" "}
        {/* Display error message */}
      </div>
    );
  }
);

InputField.displayName = "InputField"; // Set display name for debugging

export default InputField;
