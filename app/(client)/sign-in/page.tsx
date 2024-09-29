"use client"; // Add this directive to make it a Client Component

import { useForm } from "react-hook-form";
import Card from "../../components/card";
import InputField from "../../components/input-field";
import Button from "@/app/components/button";
import Link from "next/link";
import ErrorInputField from "@/app/components/error-input-field";

interface SignInFormData {
  username: string;
  password: string;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => {
    console.log("Sign In Data:", data);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
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
