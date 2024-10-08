"use client"; // Add this directive to make it a Client Component

import { useForm } from "react-hook-form";
import Card from "../../components/card";
import InputField from "../../components/input-field";
import Link from "next/link";
import { toast } from "react-toastify";
import { signInApi } from "@/src/data-source/auth/apis/auth-api";
import { BaseResponse } from "@/src/utils/network/models/common/base-response";
import Loading from "@/app/components/loading";
import { LocalStorageKey } from "@/src/constants/local-storage-key";
import AppButton from "@/app/components/app-button";
import { ClientRoutes } from "@/src/constants/routes";
import { TextConstant } from "@/src/constants/text-constant";

import WithAuth from "@/app/components/with-auth";
import { useState } from "react";
import { LocalStorageHelper } from "@/src/utils/others/local-storage-helper";
import FormValidator from "@/src/utils/others/form-validate";

// import ReCAPTCHA from "react-google-recaptcha"; // Import ReCAPTCHA component

interface SignInFormData {
  username: string;
  password: string;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      username:
        LocalStorageHelper.getItem(LocalStorageKey.REMEMBER_ME_USERNAME) || "",
      password:
        LocalStorageHelper.getItem(LocalStorageKey.REMEMBER_ME_PASSWORD) || "",
    },
  });

  const [rememberMe, setRememberMe] = useState(true); // State for remember me checkbox
  const [loading, setLoading] = useState(false); // State to manage loading
  async function handleSignIn(data: SignInFormData) {
    setLoading(true); // Set loading to true when the sign-up process starts
    try {
      const response = await signInApi(data);

      if (rememberMe) {
        LocalStorageHelper.setItem(
          LocalStorageKey.REMEMBER_ME_USERNAME,
          data.username
        );
        LocalStorageHelper.setItem(
          LocalStorageKey.REMEMBER_ME_PASSWORD,
          data.password
        );
      } else {
        LocalStorageHelper.removeItem(LocalStorageKey.REMEMBER_ME_USERNAME);
        LocalStorageHelper.removeItem(LocalStorageKey.REMEMBER_ME_PASSWORD);
      }
      toast.success(response.data.message);
      window.location.href = ClientRoutes.HOME;
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
        <form onSubmit={handleSubmit(handleSignIn)}>
          <InputField
            label={TextConstant.USERNAME_EMAIL}
            type="text"
            register={register("username", {
              validate: (value) => FormValidator.validateUsername(value),
            })}
            name="username"
            error={errors.username}
            placeholder={TextConstant.USERNAME_EMAIL_PLACEHOLDER}
          />

          <InputField
            label={TextConstant.PASSWORD}
            type="password"
            register={register("password", {
              validate: (value) => FormValidator.validatePassword(value, false),
            })}
            name="password"
            error={errors.password}
            placeholder={TextConstant.PASSWORD_PLACEHOLDER}
          />

          <div className="flex items-center pb-6">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)} // Toggle remember me state
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
              {TextConstant.REMEMBER_ME}
            </label>
          </div>
          {/* 
        <div className="flex justify-center">
          <ReCAPTCHA
            sitekey="YOUR_RECAPTCHA_SITE_KEY" // Replace with your ReCAPTCHA site key
            onChange={(value) => setCaptchaValue(value)} // Set captcha value on change
          />
        </div> */}

          <div className="flex justify-center">
            <AppButton type="submit">{TextConstant.SIGN_IN}</AppButton>{" "}
            {/* Change type to submit */}
          </div>

          <p className="mt-4 text-sm text-gray-600 flex justify-center">
            {TextConstant.DO_NOT_HAVE_AN_ACCOUNT}
            <Link href={ClientRoutes.SIGN_UP} className="text-blue-500 ml-1">
              {TextConstant.SIGN_UP}
            </Link>
          </p>
        </form>
      </Card>
    </WithAuth>
  );
}
