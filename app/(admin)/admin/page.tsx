"use client";

import { FaBars } from "react-icons/fa";
import AdminSideBar from "../../components/admin-side-bar";
import { useEffect, useState } from "react";
import DashboardPage from "./dashboard/page";
import { CheckUserLoggedIn } from "@/src/utils/others/others-util";

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    CheckUserLoggedIn();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSideBar isOpen={isOpen} />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-800 text-white p-4 flex justify-between md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            <FaBars />
          </button>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>
        <div className="flex-1 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <DashboardPage />
          </div>
        </div>
      </div>
    </div>
  );
}
