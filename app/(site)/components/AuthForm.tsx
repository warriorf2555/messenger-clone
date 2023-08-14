"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import AuthSocialButton from "./AuthSocialButton";

import { BsGithub, BsGoogle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

enum VariantType {
  login = "LOGIN",
  register = "REGISTER",
}

enum SocialActionType {
  github = "github",
  google = "google",
}

type Variant = "LOGIN" | "REGISTER";

type Props = {};

function AuthForm({}: Props) {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === VariantType.login) {
      setVariant(VariantType.register);
    } else {
      setVariant(VariantType.login);
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === VariantType.register) {
      // axios register
      axios
        .post("/api/register", data)
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === VariantType.login) {
      // NextAuth login
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok && !callback?.error) {
            toast.success("Logged In!");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // NextAuth social signIn
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in!");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <article className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === VariantType.register && (
            <Input id="name" label="Name" register={register} errors={errors} disabled={isLoading} />
          )}
          <Input id="email" label="Email Address" type="email" register={register} errors={errors} disabled={isLoading} />
          <Input id="password" label="Password" type="password" register={register} errors={errors} disabled={isLoading} />
          <Button disabled={isLoading} fullWidth type="submit">
            {variant === VariantType.login ? "Sign In" : "Register"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">or continue with</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton icon={BsGithub} onClick={() => socialAction(SocialActionType.github)} />
            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction(SocialActionType.google)} />
          </div>

          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>{variant === VariantType.login ? "New to Messenger " : "Already have an account?"}</div>
            <div onClick={toggleVariant} className="underline cursor-pointer ">
              {variant === VariantType.login ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default AuthForm;
