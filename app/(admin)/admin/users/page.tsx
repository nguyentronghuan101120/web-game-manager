"use client";

import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const initialUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 border-b text-left">ID</th>
            <th className="py-3 px-4 border-b text-left">Name</th>
            <th className="py-3 px-4 border-b text-left">Email</th>
            <th className="py-3 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-4 border-b">{user.id}</td>
              <td className="py-3 px-4 border-b">{user.name}</td>
              <td className="py-3 px-4 border-b">{user.email}</td>
              <td className="py-3 px-4 border-b">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
