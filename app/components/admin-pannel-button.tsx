import React, { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { TextConstant } from "@/src/constants/text-constant";
import { AdminRoutes } from "@/src/constants/routes";
const AdminPanelButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
    // Simulating an API call or action
    setTimeout(() => {
      setIsPressed(false);
    }, 1000);

    window.location.href = AdminRoutes.ADMIN;
  };

  return (
    <div>
      <button
        className={`
          relative overflow-hidden px-6 py-3 text-lg font-semibold text-white
          rounded-lg shadow-lg transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
          ${
            isHovered
              ? "bg-gradient-to-r from-blue-500 to-purple-600"
              : "bg-gradient-to-r from-blue-400 to-purple-500"
          }
          ${isPressed ? "transform scale-95" : "transform scale-100"}
          m-2
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={handleClick}
        aria-label="Open Admin Panel"
      >
        <span className="flex items-center justify-center">
          <FaUserShield className="mr-2" />
          {TextConstant.ADMIN_PANEL}
        </span>
        <span
          className={`
            absolute inset-0 bg-white opacity-25 transform scale-x-0 transition-transform duration-300
            ${isHovered ? "scale-x-100" : ""}
          `}
        />
      </button>
    </div>
  );
};

export default AdminPanelButton;
