"use client";

import AppDialog from "@/app/components/app-dialog";
import Loading from "@/app/components/loading";
import AppTable from "@/app/components/table/app-table";
import { TableColumnModel } from "@/app/components/table/table-colum-model";
import {
  deleteUserApi,
  getUsersApi,
  searchUserApi,
} from "@/src/data-source/users/apis/user-api";
import { BaseResponse } from "@/src/utils/network/models/common/base-response";
import { useEffect, useState } from "react";
import { UserResponse } from "@/src/data-source/users/models/responses/user-response";
import { toast } from "react-toastify";
import ErrorLabel from "@/app/components/error-label";
import UserEditorFormDialog from "./user-editor-form-dialog";
import { TextConstant } from "@/src/constants/text-constant";
import { PaginationAndTotalModel } from "@/src/utils/network/models/common/paginationAndTotal.model";

export default function UsersPage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<BaseResponse | null>(null);
  const [isUserEditorDialogOpen, setIsUserEditorDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse>();
  const [isSearchActive, setIsSearchActive] = useState(false); // New state for search activity

  const [pagination, setPagination] = useState<PaginationAndTotalModel>({
    page: 1,
    limit: 5,
    total: 0,
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!isSearchActive) {
      // Only fetch users if search is not active
      const fetchUsers = async () => {
        try {
          setIsLoading(true);
          const result = await getUsersApi(pagination);
          setUsers(result.data.data ?? []);
          setTotal(result.data.pagination?.total ?? 0);
        } catch (error) {
          setError(error as BaseResponse);
        } finally {
          setIsLoading(false);
        }
      };
      fetchUsers();
    }
  }, [pagination, isSearchActive]); // Add isSearchActive to dependencies

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

  const handleSearch = async (q: string) => {
    setIsLoading(true);
    setIsSearchActive(true); // Mark search as active

    if (!q || q === "") {
      setIsSearchActive(false);
      setIsLoading(false);
      return;
    }
    try {
      const result = await searchUserApi(q, { ...pagination, page: 1 });
      setUsers(result.data.data ?? []);
      setTotal(result.data.pagination?.total ?? 0);
      setPagination((prev: PaginationAndTotalModel) => ({
        ...prev,
        page: 1,
      }));
    } catch (error) {
      toast.error((error as BaseResponse).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      {error && <ErrorLabel error={error} />}
      {!error && (
        <>
          <div className="relative">
            <AppTable
              headerColumns={headerColumns}
              items={users}
              onDelete={(id) => confirmDelete(id)}
              onEdit={(id) => handleEdit(id)}
              tableHeaderProps={{
                total: total,
                onSearch: (value: string) => handleSearch(value),
                onAdd: handleAdd,
                onFilter: (value: string) => value,
                onPageSizeChange: (value: string) => {
                  setPagination((prev: PaginationAndTotalModel) => ({
                    ...prev,
                    limit: parseInt(value),
                    page: 1,
                  }));
                },
              }}
              tableFooterProps={{
                total: total,
                onPageChange: (value: number) => {
                  setPagination((prev: PaginationAndTotalModel) => ({
                    ...prev,
                    page: value,
                  }));
                },
                onPrevious: () => {
                  setPagination((prev: PaginationAndTotalModel) => ({
                    ...prev,
                    page: prev.page - 1,
                  }));
                },
                onNext: () => {
                  setPagination((prev: PaginationAndTotalModel) => ({
                    ...prev,
                    page: prev.page + 1,
                  }));
                },
                itemsPerPage: pagination.limit,
                page: pagination.page,
              }}
            />
            {isLoading && (
              <Loading
                showText={true}
                className="absolute rounded-large top-32"
              />
            )}
          </div>

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
