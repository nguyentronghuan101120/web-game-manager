"use client";

import { LocalStorageKey } from "@/src/constants/local-storage-key";
import { Link } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import { FaUser } from "react-icons/fa";
import ConfirmDialog from "./dialog";

export default function ProfileButton() {
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Add explicit type here

  useEffect(() => {
    const storedUsername = localStorage.getItem(LocalStorageKey.USERNAME);

    if (storedUsername) {
      setUsername(storedUsername);
    }

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
    window.location.href = "/home";
    localStorage.removeItem(LocalStorageKey.USERNAME);
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
        hi, {username}
      </span>
      {dropdownOpen && (
        <div className="absolute right-0 left-1 mt-10 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20">
          <ul className="py-1">
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200 ease-in-out transform hover:scale-105"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
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
      <ConfirmDialog
        isOpen={isDialogOpen}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />
    </div>
  );
}
