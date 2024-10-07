"use client";

import { Link } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import AppDialog from "./app-dialog";
import { ClientRoutes } from "@/src/constants/routes";
import AdminPanelButton from "./admin-pannel-button";
import { TextConstant } from "@/src/constants/text-constant";
import { LogoutUser } from "@/src/utils/others/others-util";
import { SignInResponse } from "@/src/data-source/auth/models/responses/sign-in-response";
import { LocalStorageHelper } from "@/src/utils/others/local-storage-helper";

export default function ProfileButton() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Add explicit type here
  const [userData, setUserData] = useState<SignInResponse | null>(null);

  useEffect(() => {
    const userData = LocalStorageHelper.getUser();
    setUserData(userData);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    setIsDialogOpen(true);
  };

  const handleConfirmLogout = () => {
    LogoutUser();
    setIsDialogOpen(false);
  };

  const handleCancelLogout = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="relative flex text-left " ref={dropdownRef}>
      <span
        className="text-gray-900 dark:text-white font-medium flex items-center cursor-pointer"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <FaUser className="text-gray-700 transition-colors duration-300 mr-2" />
        hi, {userData?.user?.username ?? "Guest"}
      </span>
      {dropdownOpen && (
        <div
          className={`absolute right-0 left-1 mt-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20 ${
            userData?.user.role === 1 ? "w-52" : "w-48"
          }`}
        >
          <ul className="py-1 rounded-lg">
            {userData?.user.role === 1 && (
              <li>
                <AdminPanelButton />
              </li>
            )}

            <li>
              <Link
                href={ClientRoutes.PROFILE}
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out transform hover:scale-105"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href={ClientRoutes.SETTINGS}
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out transform hover:scale-105"
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out transform hover:scale-105"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      <AppDialog
        type="confirm"
        isOpen={isDialogOpen}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
        title={TextConstant.ARE_YOU_SURE}
        subtitle={TextConstant.DO_YOU_WANT_TO_LOGOUT}
      />
    </div>
  );
}
