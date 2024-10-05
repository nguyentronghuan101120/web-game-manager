import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary"; // Optional variant prop for styling
}

const AppButton: React.FC<ButtonProps> = ({
  children,
  variant = "primary", // Default to primary variant
  className, // Allow additional class names
  ...props // Spread other button props
}) => {
  const baseClasses = "mt-4 p-2 rounded w-full";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-500 text-white"
      : "border-2 border-blue-500 text-blue-500"; // Secondary variant with border only

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`} // Combine classes
      {...props} // Spread any other props (like onClick, disabled, type, etc.)
    >
      {children}
    </button>
  );
};

export default AppButton;
