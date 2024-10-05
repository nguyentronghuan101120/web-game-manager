"use client";

import AppDialog from "@/app/components/app-dialog";
import Loading from "@/app/components/loading";
import AppTable from "@/app/components/table/app-table";
import { TableColumnModel } from "@/app/components/table/table-colum-model";
import {
  deleteUserApi,
  getUsersApi,
} from "@/src/data-source/users/apis/user-api";
import { BaseResponse } from "@/src/utils/network/models/common/base-response";
import { useEffect, useState } from "react";
import SignInFormDialog from "./create-user-form-dialog";
import { UserResponse } from "@/src/data-source/users/models/responses/user-response";
import { toast } from "react-toastify";
import ErrorLabel from "@/app/components/error-label";

export default function UsersPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<BaseResponse | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const result = await getUsersApi();
        setUsers(result.data.data ?? []);
      } catch (error) {
        setError(error as BaseResponse);
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

  const handleDelete = async (userId: number) => {
    setIsLoading(true);
    try {
      await deleteUserApi(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error((error as BaseResponse).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (userId: number) => {
    setIsDialogOpen(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      {isLoading && <Loading />}
      {error && <ErrorLabel error={error} />}
      {!error && (
        <>
          <AppTable
            headerColumns={headerColumns}
            items={users}
            onAdd={handleAdd}
            onDelete={(id) => handleDelete(id)}
            onEdit={(id) => handleEdit(id)}
          />
          <AppDialog type="form" isOpen={isDialogOpen}>
            <SignInFormDialog
              isOpen={isDialogOpen}
              onClose={handleClose}
              onSuccess={(user) => {
                setUsers((prevUsers) => [user, ...prevUsers]);
                handleClose();
              }}
            />
          </AppDialog>
        </>
      )}
    </div>
  );
}
