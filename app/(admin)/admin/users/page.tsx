"use client";

import ErrorLabel from "@/app/components/error";
import Loading from "@/app/components/loading";
import AppTable from "@/app/components/table/app-table";
import { TableColumnModel } from "@/app/components/table/table-colum-model";
import { getUsersApi } from "@/src/data-source/users/apis/user-api";
import { UserResponse } from "@/src/data-source/users/models/responses/UserResponse";
import { BaseResponse } from "@/src/utils/network/models/common/base-response";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const result = await getUsersApi();
        console.log(result.data.data);
        setUsers(result.data.data ?? []);
      } catch (error) {
        setError((error as BaseResponse).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Columns definition
  const headerColumns: TableColumnModel[] = [
    { name: "Username", sortable: true },
    { name: "Email", sortable: false },
    { name: "Activated", sortable: false },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      {isLoading && <Loading />}
      {error && <ErrorLabel message={error} />}
      {users.length > 0 && (
        <AppTable headerColumns={headerColumns} items={users} />
      )}
    </div>
  );
}
