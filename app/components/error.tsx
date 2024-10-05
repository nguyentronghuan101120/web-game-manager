import React from "react";

interface ErrorLabelProps {
  message: string;
}

const ErrorLabel: React.FC<ErrorLabelProps> = ({ message }) => {
  return (
    <div
      className="flex items-center p-2 bg-red-100 border border-red-400 text-red-700 rounded relative justify-center"
      role="alert"
    >
      <span className="font-bold">Error:</span>
      <span className="ml-2">{message}</span>
    </div>
  );
};

export default ErrorLabel;
