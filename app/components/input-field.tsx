/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@nextui-org/react";
import { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form"; // Assuming you're using react-hook-form
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError; // Error message as an object from react-hook-form
  register?: any; // Register function from react-hook-form
  type?: "text" | "password" | "email"; // Allow type to be text, password, or email
  leadingIcon?: React.ReactNode; // Whether the input has an icon
  className?: string; // Additional CSS classes
}

const AppInput = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      register,
      type = "text",
      leadingIcon,
      className,
      ...inputProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev); // Toggle the state
    };

    const hasIcon = type === "password"; // Determine if the input has an icon

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
            {label}
          </label>
        )}
        <div className="relative">
          {leadingIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 z-10">
              {leadingIcon}
            </div>
          )}
          <Input
            isClearable
            ref={ref}
            onClear={() => {
              inputProps.onChange?.({
                target: { value: "" },
              } as unknown as React.ChangeEvent<HTMLInputElement>);
            }}
            type={hasIcon && !showPassword ? "password" : "text"} // Toggle input type
            className={`bg-gray-50 border mb-2 ${
              error ? "border-red-500" : ""
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              hasIcon ? "pr-10" : leadingIcon ? "pl-10" : ""
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

AppInput.displayName = "InputField"; // Set display name for debugging

export default AppInput;
