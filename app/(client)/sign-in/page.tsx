"use client"; // Add this directive to make it a Client Component

import { useForm } from "react-hook-form";
import Card from "../../components/card";
import InputField from "../../components/input-field";
import Button from "@/app/components/button";
import Link from "next/link";
import ErrorInputField from "@/app/components/error-input-field";
import { useState } from "react";
import { toast } from "react-toastify";
import { signInApi } from "@/src/data-source/auth/apis/auth-api";
import { BaseResponse } from "@/src/utils/network/models/common/base-response";
import { useRouter } from "next/navigation";
import { SignInRequest } from "@/src/data-source/auth/models/requests/sign-in-request";
import Loading from "@/app/components/loading";
// import ReCAPTCHA from "react-google-recaptcha"; // Import ReCAPTCHA component

interface SignInFormData {
  username: string;
  password: string;
  rememberMe: boolean; // Added rememberMe field
}

export default function SignIn() {
  const {
    register,
    formState: { errors },
  } = useForm<SignInFormData>();

  const [rememberMe, setRememberMe] = useState(false); // State for remember me checkbox
  // const [captchaValue, setCaptchaValue] = useState<string | null>(null); // State for captcha value
  const [loading, setLoading] = useState(false); // State to manage loading
  const router = useRouter();
  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); // Set loading to true when the sign-up process starts
    const formData = new FormData(event.currentTarget);
    const data: SignInRequest = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    try {
      const response = await signInApi(data);

      if (rememberMe) {
        localStorage.setItem("username", data.username);
        localStorage.setItem("password", data.password); // Consider security implications
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
      toast.success(response.data.message);
      router.push("/home");
    } catch (error) {
      toast.error((error as BaseResponse).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      {loading && <Loading />} {/* Show loading component when loading */}
      <form onSubmit={handleSignIn}>
        <InputField
          label="Username"
          type="text"
          {...register("username", { required: "Username is required" })}
          placeholder="Enter your username"
        />
        {errors.username && <ErrorInputField error={errors.username.message} />}

        <InputField
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Password must be more than 4 characters",
            },
          })}
          placeholder="Enter your password"
        />
        {errors.password && <ErrorInputField error={errors.password.message} />}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            {...register("rememberMe")}
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)} // Toggle remember me state
          />
          <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
            Remember Me
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
          <Button type="submit">Sign In</Button> {/* Change type to submit */}
        </div>

        <p className="mt-4 text-sm text-gray-600 flex justify-center">
          You do not have an account?{" "}
          <Link href="/sign-up" className="text-blue-500 ml-1">
            Register
          </Link>
        </p>
      </form>
    </Card>
  );
}
