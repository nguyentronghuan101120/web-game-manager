import React from "react";
import { TextConstant } from "@/src/constants/text-constant";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-blue-600 via-blue-500 to-white">
      <h1 className="text-9xl font-bold text-white animate-bounce">404</h1>
      <p className="text-2xl text-white mt-4">{TextConstant.NOT_FOUND_PAGE}</p>
      <div className="mt-8">
        <a
          href="/"
          className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-md shadow-lg hover:bg-gray-100 transition-all duration-500 ease-in-out transform hover:scale-110 hover:-rotate-2"
        >
          {TextConstant.GO_HOME}
        </a>
      </div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-pulse"></div>
      <div className="absolute top-16 right-16 w-24 h-24 bg-gradient-to-l from-indigo-500 to-pink-500 rounded-full mix-blend-multiply filter blur-lg opacity-60 animate-pulse"></div>
    </div>
  );
};

export default NotFoundPage;
