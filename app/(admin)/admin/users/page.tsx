"use client";

import AppDialog from "@/app/components/app-dialog";
import ErrorLabel from "@/app/components/error";
import Loading from "@/app/components/loading";
import AppTable from "@/app/components/table/app-table";
import { TableColumnModel } from "@/app/components/table/table-colum-model";
import {
  createUserApi,
  getUsersApi,
} from "@/src/data-source/users/apis/user-api";
import { UserResponse } from "@/src/data-source/users/models/responses/UserResponse";
import { BaseResponse } from "@/src/utils/network/models/common/base-response";
import { useEffect, useState } from "react";
import SignInFormDialog from "./create-user-form-dialog";

export default function UsersPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const result = await getUsersApi();
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

  const handleAdd = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      {isLoading && <Loading />}
      {error && <ErrorLabel message={error} />}
      <AppTable headerColumns={headerColumns} items={users} onAdd={handleAdd} />
      <AppDialog
        type="form"
        isOpen={isDialogOpen}
      >
        <SignInFormDialog isOpen={isDialogOpen} onClose={handleClose} />
      </AppDialog>
    </div>
  );
}
