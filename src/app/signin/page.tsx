"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

type dataType = { email: string; password: string };

function Form() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const updateShowPass = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPass((p) => !p);
  };

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="login-email">Email</label>
        <input
          autoFocus
          id="login-email"
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email",
            },
          })}
        />

        {errors.email && (
          <div className="mt-0.5 text-xs text-red-600">
            {errors.email.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="login-password">Password</label>
        <div className="relative">
          <input
            id="login-password"
            type={showPass ? "text" : "password"}
            placeholder="Enter your password"
            className="pr-9"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
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
        className="block mx-auto mb-6 px-12 bg-slate-900 text-white hover:bg-slate-700 transition-colors"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}

export default Form;
