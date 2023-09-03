import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/pages/api/auth/[...nextauth]";
import Image from "next/image";

import logo from "src/assets/logo/logo_w.png";
import CtaButton from "@/src/components/CtaButton";
import InputField from "@/src/components/InputField";
import { customApis, routes } from "@/src/utils/routes";
import { FormEvent, useEffect, useState } from "react";
import { FetchMethod, useApi } from "@/src/hooks/usePost";
import { SignUpUser, DBUser } from "@/src/utils/types";
import { Utils } from "@/src/utils/utils";
import LoadingSpinner from "@/src/components/LoadingSpinner";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [request, data, isLoading, error] = useApi<SignUpUser, DBUser>(
    customApis.signup,
    FetchMethod.POST
  );

  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (data.email && data.id && password) {
      signIn("email", {
        email: data.email,
        password: password,
        redirect: true,
        callbackUrl: "/profile",
      });

      setPassword("");
    }
  }, [data, password]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const data: { [key: string]: string } = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      password: form.get("password") as string,
      confirmPassword: form.get("confirmPassword") as string,
    };

    if (validateData(data)) {
      request({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      setPassword(data.password);
    }
  };

  const validateData = (data: { [key: string]: string }): boolean => {
    const err: { [key: string]: string } = {};

    if (data.name?.length < 4) {
      err.name = "Name must be atleast 4 characters long";
    } else if (data.name?.length > 30) {
      err.name = "Name should be less than 30 characters";
    } else if (!Utils.validateEmail(data.email)) {
      err.email = "Invalid email";
    } else if (data.password?.length < 6) {
      err.password = "Password should be at least 6 characters long";
    } else if (data.password !== data.confirmPassword) {
      err.confirmPassword = "Passwords don't match";
    }

    setValidationErrors(err);

    if (Object.keys(err).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-white"
        >
          <Image className="w-auto h-20 m-auto" src={logo} alt="logo" />
        </a>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white w-full text-center">
              Sign up for an account
            </h1>
            <div className="divide-y divide-gray-600">
              <CtaButton
                text={`Sign up with ${providers?.github?.name}`}
                type="submit"
                className="my-6 w-full justify-center"
                onClick={() => signIn(providers?.github?.id)}
                isSecondary
              />

              <form
                className="space-y-4 md:space-y-6 mt-3"
                method="POST"
                action={customApis.signup}
                onSubmit={onSubmit}
              >
                <InputField
                  label="Your Name"
                  type="string"
                  name="name"
                  placeholder="Jane Doe"
                  error={validationErrors.name}
                  disabled={isLoading}
                  required
                />
                <InputField
                  label="Your Email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  error={validationErrors.email}
                  disabled={isLoading}
                  required
                />
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  error={validationErrors.password}
                  disabled={isLoading}
                  required
                />
                <InputField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  error={validationErrors.confirmPassword}
                  disabled={isLoading}
                  required
                />
                {isLoading || data.id ? (
                  <LoadingSpinner />
                ) : (
                  <CtaButton
                    text="Sign Up"
                    type="submit"
                    className="mt-6 w-full justify-center"
                    disabled={isLoading}
                  />
                )}

                <p
                  className={`mt-2 ${
                    error ? "" : "invisible"
                  } text-red-600 text-sm`}
                >
                  {error}
                </p>
                <p className="text-sm font-light text-gray-400">
                  Already have an account?{" "}
                  <a
                    href={routes.signin}
                    className="font-medium text-primary-600 hover:underline text-primary-500"
                  >
                    Sign In
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session && !context.query.force) {
    return { redirect: { destination: routes.profile } };
  }

  const providers = await getProviders();

  return {
    props: {
      providers: providers as {
        github: ClientSafeProvider;
        email: ClientSafeProvider;
      },
      session,
    },
  };
}
