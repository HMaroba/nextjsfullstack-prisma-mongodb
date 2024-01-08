"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

type dataType = { emailAddress: string; password: string };

function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: dataType) => {
    try {
      const status = await signIn("credentials", {
        redirect: false,
        ...data,
      });

      if (status?.ok) router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center w-full bg-gray-300">
    <div className=" bg-white rounded-md shadow-lg p-5 w-1/3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-3xl text-blue-500 text-center p-4 font-semibold">Sign in</p>
        <div className="mb-4 w-full">
          <label htmlFor="login-email">Email Address</label>
          <div className="relative">
          <input
            className="border-2 p-1 border-blue-400 w-full mt-2"
            autoFocus
            id="login-email"
            type="email"
            placeholder="Enter your email"
            {...register("emailAddress", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
          />

          {errors.emailAddress && (
            <div className="mt-0.5 text-xs text-red-600">
              {errors.emailAddress.message}
            </div>
          )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="login-password">Password</label>
          <div className="relative">
            <input
              id="login-password"
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              className="p-1 w-full border-gray-500 border-2 mt-2"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message: "Password must be strong",
                },
              })}
            />
          </div>

          {errors.password && (
            <div className="mt-0.5 text-xs text-red-600">
              {errors.password.message}
            </div>
          )}
        </div>

        <button
          className="block mx-auto mb-6 px-12 h-10 bg-slate-900 text-white hover:bg-slate-700 transition-colors rounded-md "
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
    </div>
  );
}

export default Form;
