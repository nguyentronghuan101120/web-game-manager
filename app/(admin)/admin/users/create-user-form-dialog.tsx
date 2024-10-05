import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../../../components/input-field";
import AppButton from "@/app/components/app-button";
import { useState } from "react";
import { toast } from "react-toastify";
import { BaseResponse } from "@/src/utils/network/models/common/base-response";
import { createUserApi } from "@/src/data-source/users/apis/user-api";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/src/utils/form-validate/form-validate";

interface CreateUserFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function CreateUserFormDialog({
  isOpen,
  onClose,
}: CreateUserFormDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false); // State to manage loading

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true); // Set loading to true when the process starts
    try {
      const response = await createUserApi(data);
      toast.success(response.data.message);
      onClose(); // Close the dialog on success
      window.location.reload();
    } catch (error) {
      toast.error((error as BaseResponse).message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Add User
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Username"
          type="text"
          {...register("username", { validate: validateUsername })}
          placeholder="Enter your username"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}

        <InputField
          label="Email"
          type="email"
          {...register("email", { validate: validateEmail })}
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <InputField
          label="Password"
          type="password"
          {...register("password", { validate: validatePassword })}
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <InputField
          label="Confirm Password"
          type="password"
          {...register("confirmPassword", {
            validate: (value) =>
              validateConfirmPassword(value, getValues("password")),
          })}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}

        <div className="flex justify-end space-x-3 mt-4">
          <AppButton variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </AppButton>
          <AppButton variant="primary" disabled={loading} type="submit">
            {loading ? "Loading..." : "Add User"}
          </AppButton>
        </div>
      </form>
    </div>
  );
}
