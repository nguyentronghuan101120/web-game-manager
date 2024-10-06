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
import EditUserFormDialog from "./edit-user-form-dialog";

export default function UsersPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<BaseResponse | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse>();

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
    setIsCreateDialogOpen(true);
  };

  const handleClose = () => {
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(false);
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
      handleClose();
    }
  };

  const handleEdit = (userId: number) => {
    setIsEditDialogOpen(true);
    setSelectedUser(users.find((user) => user.id === userId));
  };

  const confirmDelete = (userId: number) => {
    setIsDeleteDialogOpen(true);
    setSelectedUser(users.find((user) => user.id === userId));
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
            onDelete={(id) => confirmDelete(id)}
            onEdit={(id) => handleEdit(id)}
          />
          <AppDialog type="form" isOpen={isCreateDialogOpen}>
            <SignInFormDialog
              isOpen={isCreateDialogOpen}
              onClose={handleClose}
              onSuccess={(user) => {
                setUsers((prevUsers) => [user, ...prevUsers]);
                handleClose();
              }}
            />
          </AppDialog>

          <AppDialog
            type="form"
            isOpen={isEditDialogOpen}
            className="max-w-full max-h-full"
          >
            <EditUserFormDialog
              isOpen={isEditDialogOpen}
              onClose={handleClose}
              onSuccess={(user: UserResponse) => {
                setUsers((prevUsers) =>
                  prevUsers.map((u) => (u.id === user.id ? user : u))
                );
                handleClose();
              }}
              user={selectedUser as UserResponse}
            />
          </AppDialog>
          <AppDialog
            type="confirm"
            isOpen={isDeleteDialogOpen}
            onConfirm={() => handleDelete(selectedUser?.id as number)}
            onCancel={handleClose}
          />
        </>
      )}
    </div>
  );
}
