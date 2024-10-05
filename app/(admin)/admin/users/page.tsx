"use client";

import AppTable from "@/app/components/table/app-table";
import { TableColumnModel } from "@/app/components/table/table-colum-model";

export default function UsersPage() {
  // Sample data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "inactive",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      status: "active",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob@example.com",
      status: "pending",
    },
  ];

  // Columns definition
  const headerColumns: TableColumnModel[] = [
    { name: "Name", sortable: true },
    { name: "Email", sortable: false },
    { name: "Status", sortable: false },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      <AppTable headerColumns={headerColumns} items={users} />
    </div>
  );
}
