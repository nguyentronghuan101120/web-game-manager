"use client"; // Add this directive to make it a Client Component

import { useForm } from "react-hook-form";
import Card from "../../components/card";
import AppInput from "../../components/input-field";
import Link from "next/link";
import { toast } from "react-toastify";
import Loading from "@/app/components/loading"; // Import loading component
import { signUpApi } from "@/src/data-source/auth/apis/auth-api";
import { BaseResponse } from "@/src/utils/network/models/common/base-response";
import { useRouter } from "next/navigation";
import AppButton from "@/app/components/app-button";
import { ClientRoutes } from "@/src/constants/routes";
import { TextConstant } from "@/src/constants/text-constant";

import WithAuth from "@/app/components/with-auth";
import { useState } from "react";
import FormValidator from "@/src/utils/others/form-validate";
interface SignUpFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormData>();

  const router = useRouter();

  const [loading, setLoading] = useState(false); // State to manage loading

  async function handleSignUp(data: SignUpFormData) {
    setLoading(true); // Set loading to true when the sign-up process starts
    try {
      const response = await signUpApi(data);

      toast.success(response.data.message);
      router.push(ClientRoutes.SIGN_IN);
    } catch (error) {
      toast.error((error as BaseResponse).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <WithAuth>
      <Card>
        {loading && <Loading />} {/* Show loading component when loading */}
        <form onSubmit={handleSubmit(handleSignUp)}>
          <AppInput
            label={TextConstant.USERNAME}
            type="text"
            register={register("username", {
              validate: (value) => FormValidator.validateUsername(value),
            })}
            name="username"
            error={errors.username}
            placeholder={TextConstant.USERNAME_PLACEHOLDER}
          />
          <AppInput
            label={TextConstant.EMAIL}
            type="email"
            register={register("email", {
              validate: (value) => FormValidator.validateEmail(value),
            })}
            name="email"
            error={errors.email}
            placeholder={TextConstant.EMAIL_PLACEHOLDER}
          />

          <AppInput
            label={TextConstant.PASSWORD}
            type="password"
            register={register("password", {
              validate: (value) => FormValidator.validatePassword(value, false),
            })}
            name="password"
            error={errors.password}
            placeholder={TextConstant.PASSWORD_PLACEHOLDER}
          />
          <AppInput
            label={TextConstant.CONFIRM_PASSWORD}
            type="password"
            register={register("confirmPassword", {
              validate: (value) =>
                FormValidator.validateConfirmPassword(
                  value,
                  getValues("password"),
                  false
                ),
            })}
            name="confirmPassword"
            error={errors.confirmPassword}
            placeholder={TextConstant.CONFIRM_PASSWORD_PLACEHOLDER}
          />

          <div className="flex justify-center">
            <AppButton type="submit" disabled={loading}>
              {" "}
              {/* Disable button when loading */}
              {loading ? "Loading..." : "Sign Up"} {/* Show loading text */}
            </AppButton>
          </div>

          <p className="mt-4 text-sm text-gray-600 flex justify-center">
            {TextConstant.DO_NOT_HAVE_AN_ACCOUNT}
            <Link href={ClientRoutes.SIGN_IN} className="text-blue-500 ml-1">
              {TextConstant.SIGN_IN}
            </Link>
          </p>
        </form>
      </Card>
    </WithAuth>
  );
}
