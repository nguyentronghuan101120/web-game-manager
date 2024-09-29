"use client"; // Add this directive to make it a Client Component

import { useForm } from "react-hook-form";
import Card from "../../components/card";
import InputField from "../../components/input-field";
import Button from "@/app/components/button";
import Link from "next/link";
import ErrorInputField from "@/app/components/error-input-field";

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

  const onSubmit = (data: SignUpFormData) => {
    console.log("Sign Up Data:", data);
    // Proceed with sign up logic
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.username && (
            <ErrorInputField error={errors.username.message} />
          )}

          <InputField
            label="Password"
            type="password"
            {...register("password", { validate: validatePassword })}
            placeholder="Enter your password"
          />
          {errors.password && (
            <ErrorInputField error={errors.password.message} />
          )}

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
            <Button type="submit">Sign Up</Button> {/* Change type to submit */}
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
