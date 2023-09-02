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
import { routes } from "@/src/utils/routes";
import { FormEvent, useState } from "react";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const data: { [key: string]: string } = {
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    if (!data.email || !data.password) {
      return setError("Invalid Email or Password");
    }

    signIn("email", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/profile",
    });
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
              Sign in to your account
            </h1>
            <div className="divide-y divide-gray-600">
              <CtaButton
                text={`Sign in with ${providers.github.name}`}
                type="submit"
                className="my-6 w-full justify-center"
                onClick={() => signIn(providers.github.id)}
                isSecondary
              />

              <form
                className="space-y-4 md:space-y-6 pt-3"
                method="post"
                action={providers.email.signinUrl}
                onSubmit={onSubmit}
              >
                <InputField
                  label="Your Email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                />
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />

                <CtaButton
                  text="Sign in"
                  type="submit"
                  className="mt-6 w-full justify-center"
                />
                <p
                  className={`mt-2 ${
                    error ? "" : "invisible"
                  } text-red-600 text-sm`}
                >
                  {error}
                </p>
                <p className="text-sm font-light text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href={routes.signup}
                    className="font-medium text-primary-600 hover:underline text-primary-500"
                  >
                    Sign up
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

  if (session) {
    return { redirect: { destination: "/profile" } };
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
