"use client"; // Add this directive to make it a Client Component

import { useForm } from "react-hook-form";
import Card from "../../components/card";
import InputField from "../../components/input-field";
import Button from "@/app/components/button";
import Link from "next/link";
import ErrorInputField from "@/app/components/error-input-field";
import { useState } from "react";
// import ReCAPTCHA from "react-google-recaptcha"; // Import ReCAPTCHA component

interface SignInFormData {
  username: string;
  password: string;
  rememberMe: boolean; // Added rememberMe field
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const [rememberMe, setRememberMe] = useState(false); // State for remember me checkbox
  // const [captchaValue, setCaptchaValue] = useState<string | null>(null); // State for captcha value

  const onSubmit = (data: SignInFormData) => {
    // if (!captchaValue) {
    //   alert("Please complete the CAPTCHA"); // Alert if CAPTCHA is not completed
    //   return;
    // }

    console.log("Sign In Data:", data);
    // Handle remember me logic here (e.g., save to localStorage)
    if (data.rememberMe) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("password", data.password); // Consider security implications
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
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