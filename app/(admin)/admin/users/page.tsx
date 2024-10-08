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
import { UserResponse } from "@/src/data-source/users/models/responses/user-response";
import { toast } from "react-toastify";
import ErrorLabel from "@/app/components/error-label";
import UserEditorFormDialog from "./user-editor-form-dialog";
import { TextConstant } from "@/src/constants/text-constant";

export default function UsersPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<BaseResponse | null>(null);
  const [isUserEditorDialogOpen, setIsUserEditorDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
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
    setIsEdit(false);

    setIsUserEditorDialogOpen(true);
  };

  const handleClose = () => {
    setIsUserEditorDialogOpen(false);
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
    setIsEdit(true);

    setIsUserEditorDialogOpen(true);
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

          <AppDialog
            type="form"
            isOpen={isUserEditorDialogOpen}
            className="max-w-full max-h-full"
          >
            <UserEditorFormDialog
              isOpen={isUserEditorDialogOpen}
              onClose={handleClose}
              onSuccess={(user: UserResponse) => {
                if (isEdit) {
                  setUsers((prevUsers) =>
                    prevUsers.map((u) => (u.id === user.id ? user : u))
                  );
                } else {
                  setUsers((prevUsers) => [user, ...prevUsers]);
                }
                handleClose();
              }}
              user={selectedUser as UserResponse}
              isEdit={isEdit}
            />
          </AppDialog>
          <AppDialog
            type="confirm"
            isOpen={isDeleteDialogOpen}
            onConfirm={() => handleDelete(selectedUser?.id as number)}
            onCancel={handleClose}
            title={TextConstant.DELETE_USER}
            subtitle={TextConstant.DELETE_USER_SUBTITLE}
          />
        </>
      )}
    </div>
  );
}
