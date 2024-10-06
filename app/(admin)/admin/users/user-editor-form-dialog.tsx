import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../../../components/input-field";
import AppButton from "@/app/components/app-button";
import { useState } from "react";
import { toast } from "react-toastify";
import { BaseResponse } from "@/src/utils/network/models/common/base-response";
import {
  createUserApi,
  editUserApi,
} from "@/src/data-source/users/apis/user-api";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/src/utils/form-validate/form-validate";
import { UserResponse } from "@/src/data-source/users/models/responses/user-response";
import AppDropdown from "@/app/components/app-dropdown";

interface UserEditorFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserResponse) => void;
  user: UserResponse | null;
  isEdit?: boolean;
}

interface FormData {
  username: string;
  email: string;
  activated: number;
  role: number;
  password?: string;
  confirmPassword?: string;
}

export default function UserEditorFormDialog({
  isOpen,
  onClose,
  onSuccess,
  user,
  isEdit = false,
}: UserEditorFormDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>({
    defaultValues: isEdit
      ? {
          username: user?.username,
          email: user?.email,
          activated: user?.activated,
          role: user?.role,
          password: "",
          confirmPassword: "",
        }
      : {
          username: "",
          email: "",
          activated: 1,
          role: 0,
          password: "",
          confirmPassword: "",
        },
  });

  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await createUserApi({
        username: data.username,
        email: data.email,
        activated: data.activated,
        role: data.role,
        password: data.password as string,
      });
      onSuccess(response.data.data as UserResponse);
      toast.success("Create user successfully");
    } catch (error) {
      toast.error((error as BaseResponse).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await editUserApi(user?.id as number, {
        username: data.username,
        email: data.email,
        activated: data.activated,
        role: data.role,
        password: (data.password?.length || 0) > 0 ? data.password : undefined,
      });
      onSuccess(response.data.data as UserResponse);
      toast.success("Edit user successfully");
    } catch (error) {
      toast.error((error as BaseResponse).message);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isEdit) {
      handleEditUser(data);
    } else {
      handleCreateUser(data);
    }
  };

  const statusOptions = [
    { label: "Inactive", value: "0" },

    { label: "Active", value: "1" },
  ];

  const roleOptions = [
    { label: "User", value: "0" },

    { label: "Admin", value: "1" },
  ];

  if (!isOpen) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
        {isEdit ? "Edit User" : "Create User"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <InputField
            label="Username"
            type="text"
            register={register("username", { validate: validateUsername })}
            name="username"
            error={errors.username}
            placeholder="Enter your username"
          />
          <InputField
            label="Email"
            type="email"
            register={register("email", { validate: validateEmail })}
            name="email"
            error={errors.email}
            placeholder="Enter your email"
          />
        </div>

        <div className="flex gap-4">
          <InputField
            label="Password"
            type="password"
            register={register("password", {
              validate: (value) => validatePassword(value, isEdit),
            })}
            name="password"
            error={errors.password}
            placeholder="Enter your password"
          />
          <InputField
            label="Confirm Password"
            type="password"
            register={register("confirmPassword", {
              validate: (value) =>
                validateConfirmPassword(value, getValues("password"), isEdit),
            })}
            name="confirmPassword"
            error={errors.confirmPassword}
            placeholder="Enter your confirm password"
          />
        </div>

        <div className="flex gap-4 ">
          <AppDropdown
            options={statusOptions}
            selected={
              statusOptions.find(
                (option) => option.value === String(getValues("activated"))
              ) || statusOptions[0]
            }
            setSelected={(selected) => {
              setValue("activated", Number(selected.value));
            }}
            label="Status"
            className="mb-2"
          />
          <AppDropdown
            options={roleOptions}
            selected={
              roleOptions.find(
                (option) => option.value === String(getValues("role"))
              ) || roleOptions[0]
            }
            setSelected={(selected) => {
              setValue("role", Number(selected.value));
            }}
            label="Role"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <AppButton variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </AppButton>
          <AppButton variant="primary" disabled={loading} type="submit">
            {loading ? "Loading..." : isEdit ? "Update" : "Create"}
          </AppButton>
        </div>
      </form>
    </div>
  );
}
