"use client";

import { ThemeSwitcherButton } from "./theme-switcher-button";
import ProfileButton from "./profile-button";
import { ClientRoutes } from "@/src/constants/routes";
import AppButton from "./app-button";
import { TextConstant } from "@/src/constants/text-constant";
import { useEffect, useState } from "react";
import { LocalStorageHelper } from "@/src/utils/others/local-storage-helper";
import { SignInResponse } from "@/src/data-source/auth/models/responses/sign-in-response";

export default function NavBar() {
  const [storedUserData, setStoredUserData] = useState<SignInResponse | null>(
    null
  );
  useEffect(() => {
    const storedUserData = LocalStorageHelper.getUser();
    setStoredUserData(storedUserData);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex md:order-2 space-x-4">
          <ThemeSwitcherButton />
          {storedUserData ? (
            <ProfileButton
              username={storedUserData?.user?.username ?? ""}
              userRole={storedUserData?.user?.role ?? 0}
            />
          ) : (
            <AppButton
              variant="primary"
              className="text-sm px-4 py-2"
              onClick={() => {
                window.location.href = ClientRoutes.SIGN_IN;
              }}
            >
              {TextConstant.SIGN_IN}
            </AppButton>
          )}
          <AppButton
            variant="primary"
            className="text-sm px-4 py-2"
            // onClick={() => (window.location.href = ClientRoutes.SIGN_IN)}
          >
            {TextConstant.DOWNLOAD}
          </AppButton>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 "
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href={ClientRoutes.HOME}
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
