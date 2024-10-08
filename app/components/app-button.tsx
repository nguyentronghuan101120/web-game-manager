import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary"; // Optional variant prop for styling
  endIcon?: React.ReactNode; // Optional prop for an icon at the end
  onClick?: () => void;
}

const AppButton: React.FC<ButtonProps> = ({
  children,
  variant = "primary", // Default to primary variant
  className, // Allow additional class names
  endIcon, // Icon to be displayed at the end
  onClick,
}) => {
  const baseClasses =
    "p-3 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out transform active:scale-95 focus:outline-none focus:ring-4"; // Transition for smooth interactions

  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300 shadow-md"
      : "border-2 border-blue-500 text-blue-500 hover:bg-blue-100 focus:ring-blue-300 shadow-md"; // Enhanced hover/focus effects

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className || "w-full"} ${
        endIcon ? "flex justify-between" : ""
      } font-bold`} // Combine classes and adjust layout for endIcon
      onClick={onClick}
    >
      <span className="flex items-center justify-center">{children}</span>
      {endIcon && <span className="ml-2">{endIcon}</span>}{" "}
      {/* Render icon if provided */}
    </button>
  );
};

export default AppButton;
