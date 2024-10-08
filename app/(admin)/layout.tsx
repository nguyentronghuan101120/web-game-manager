"use client";

import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSideBar from "../components/admin-side-bar";
import WithAuth from "../components/with-auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WithAuth>
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
            <div className="p-4 bg-white rounded-lg shadow-md">{children}</div>
          </div>
        </div>
      </div>
    </WithAuth>
  );
}
