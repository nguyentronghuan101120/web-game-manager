import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary"; // Optional variant prop for styling
  endIcon?: React.ReactNode; // Optional prop for an icon at the end
}

const AppButton: React.FC<ButtonProps> = ({
  children,
  variant = "primary", // Default to primary variant
  className, // Allow additional class names
  endIcon, // Icon to be displayed at the end
  ...props // Spread other button props
}) => {
  const baseClasses = "p-2 rounded w-full  items-center justify-between"; // Added flex for alignment
  const variantClasses =
    variant === "primary"
      ? "bg-blue-500 text-white"
      : "border-2 border-blue-500 text-blue-500"; // Secondary variant with border only

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className} ${
        endIcon ? "flex" : ""
      }`} // Combine classes
      {...props} // Spread any other props (like onClick, disabled, type, etc.)
    >
      {children}
      {endIcon && <span className="ml-[4px]">{endIcon}</span>}{" "}
      {/* Render icon if provided */}
    </button>
  );
};

export default AppButton;
