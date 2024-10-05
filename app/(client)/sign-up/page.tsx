"use client"; // Add this directive to make it a Client Component

import { useForm } from "react-hook-form";
import Card from "../../components/card";
import InputField from "../../components/input-field";
import Link from "next/link";
import ErrorInputField from "@/app/components/error-input-field";
import { toast } from "react-toastify";
import { useState } from "react"; // Import useState for loading state
import Loading from "@/app/components/loading"; // Import loading component
import { signUpApi } from "@/src/data-source/auth/apis/auth-api";
import { BaseResponse } from "@/src/utils/network/models/common/base-response";
import { useRouter } from "next/navigation";
import AppButton from "@/app/components/app-button";
interface SignUpFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormData>();

  const router = useRouter();

  const [loading, setLoading] = useState(false); // State to manage loading

  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    // Add more email validation logic if needed
    return ""; // Return empty string if no error
  };

  const validateUsername = (value: string) => {
    if (value.length < 4) return "Username must be at least 4 characters";
    return ""; // Return empty string if no error
  };

  const validatePassword = (value: string) => {
    if (value.length < 4) return "Password must be at least 4 characters";
    return ""; // Return empty string if no error
  };

  const validateConfirmPassword = (value: string) => {
    const password = getValues("password");
    if (value !== password) return "Passwords do not match";
    return ""; // Return empty string if no error
  };

  async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); // Set loading to true when the sign-up process starts
    const formData = new FormData(event.currentTarget);
    const data: SignUpFormData = {
      email: formData.get("email") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };
    try {
      const response = await signUpApi(data);

      toast.success(response.data.message);
      router.push("/sign-in");
    } catch (error) {
      toast.error((error as BaseResponse).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      {loading && <Loading />} {/* Show loading component when loading */}
      <form onSubmit={handleSignUp}>
        <InputField
          label="Email"
          type="email"
          {...register("email", { validate: validateEmail })}
          placeholder="Enter your email"
        />
        {errors.email && <ErrorInputField error={errors.email.message} />}

        <InputField
          label="Username"
          type="text"
          {...register("username", { validate: validateUsername })}
          placeholder="Enter your username"
        />
        {errors.username && <ErrorInputField error={errors.username.message} />}

        <InputField
          label="Password"
          type="password"
          {...register("password", { validate: validatePassword })}
          placeholder="Enter your password"
        />
        {errors.password && <ErrorInputField error={errors.password.message} />}

        <InputField
          label="Confirm Password"
          type="password"
          {...register("confirmPassword", {
            validate: validateConfirmPassword,
          })}
          placeholder="Enter your password again"
        />
        {errors.confirmPassword && (
          <ErrorInputField error={errors.confirmPassword.message} />
        )}

        <div className="flex justify-center">
          <AppButton type="submit" disabled={loading}>
            {" "}
            {/* Disable button when loading */}
            {loading ? "Loading..." : "Sign Up"} {/* Show loading text */}
          </AppButton>
        </div>

        <p className="mt-4 text-sm text-gray-600 flex justify-center">
          You already have an account?{" "}
          <Link href="/sign-in" className="text-blue-500 ml-1">
            Sign In
          </Link>
        </p>
      </form>
    </Card>
  );
}
