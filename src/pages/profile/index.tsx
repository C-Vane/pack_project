import { getServerSession } from "next-auth";
import Image from "next/image";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { authOptions } from "../api/auth/[...nextauth]";

import { getUser } from "@/src/utils/db";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

import profile from "@/src/assets/images/profile.png";
import profilePlaceholder from "@/src/assets/images/profile_placeholder.png";
import InputField from "@/src/components/InputField";
import { DBUser, UserModifiableAttributes } from "@/src/utils/types";
import { FetchMethod, useApi } from "@/src/hooks/usePost";
import { customApis } from "@/src/utils/routes";
import { useUploadThing } from "@/src/utils/upload";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Utils } from "@/src/utils/utils";
import CtaButton from "@/src/components/CtaButton";

function Profile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [updateUser, data, isLoading, error] = useApi<
    UserModifiableAttributes,
    DBUser
  >(customApis.account, FetchMethod.PATCH);

  const { id, image, bio, name, email } = data.id ? data : user;

  const { startUpload } = useUploadThing("profilePicture");
  const [fields, setFields] = useState<UserModifiableAttributes>({
    image: image || "",
    bio: bio || "",
    name: name || "",
  });
  const [files, setFiles] = useState<File[]>([]);

  const isChanged =
    fields.image !== image || fields.name !== name || fields.bio !== bio;

  useEffect(() => {
    if (data.id) {
      setFields({
        image: data.image || "",
        bio: data.bio || "",
        name: data.name || "",
      });
      setFiles([]);
    }
  }, [data]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let fileUrl: string = image;

    if (fields.image) {
      const hasImageChanged = Utils.isBase64Image(fields.image);

      if (hasImageChanged) {
        const response = await startUpload(files);

        if (response && response[0].url) {
          fileUrl = response[0].url;
        }
      }
    }

    updateUser({
      name: fields.name,
      bio: fields.bio,
      image: fileUrl,
    });
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      var blob = file.slice(0, file.size, "image/png");

      if (!file.type.includes("image")) {
        return;
      }

      const newFile = new File([blob], `${id}.png`, { type: "image/png" });

      setFiles([newFile]);

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        setFields({ ...fields, image: `${imageDataUrl}` });
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <main>
      <Header isSignedIn={!!id} />
      <div className="flex flex-col h-100% mt-10">
        <Image
          src={profile}
          alt="meeting picture background"
          className="w-screen md:h-80 lg:h-96 object-cover object-[50%_60%]"
          unoptimized
        />

        <form onSubmit={onSubmit} className="lg:justify-start">
          <div className="flex justify-center lg:justify-start relative h-32 w-full border-t-4 border-gray-600">
            <div className="absolute -top-full h-38 md:h-40 lg:h-60 lg:left-20">
              <Image
                src={fields.image || profilePlaceholder}
                onError={(e) => (e.currentTarget.src = `${profilePlaceholder}`)}
                alt="user profile picture"
                width={200}
                height={200}
                className="h-full w-auto aspect-square rounded-full object-cover border-4 border-gray-600"
              />

              <label
                htmlFor="dropzone-file"
                className="opacity-0 flex items-center justify-center h-full w-full rounded-full inherit absolute top-0 cursor-pointer hover:opacity-100 hover:backdrop-blur-sm"
              >
                <div>
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImage(e)}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col max-w-xl lg:max-w-2xl m-auto bg-white rounded-lg shadow my-3 w-80% h-max p-5">
            <h2 className="mb-4 text-4xl font-bold tracking-tight  text-gray-900 md:text-5xl lg:text-6xl">
              Welcome to your Pack profile.
            </h2>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl">
              Make a lasting impression by adding a captivating bio and an
              interesting photo.
            </p>
            {isLoading ? (
              <div role="status" className="max-w-sm animate-pulse mt-10">
                <div className="h-4 bg-gray-200 rounded-full max-w-[360px] mb-6"></div>
                <div className="h-4 bg-gray-200 rounded-full max-w-[360px] mb-6"></div>
                <div className="h-4 bg-gray-200 rounded-full max-w-[360px] mb-6"></div>
                <div className="h-4 bg-gray-200 rounded-full max-w-[50px] mb-6"></div>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                <InputField
                  label="Name"
                  type="string"
                  name="name"
                  placeholder="Your Name"
                  value={fields.name}
                  onChange={(e) =>
                    setFields({ ...fields, name: e.currentTarget.value })
                  }
                  isLight
                />
                <InputField
                  label="About"
                  type="text"
                  placeholder="Write about yourself here..."
                  name="bio"
                  value={fields.bio}
                  onChange={(e) =>
                    setFields({ ...fields, bio: e.currentTarget.value })
                  }
                  isLight
                  isLongText
                />
                <InputField
                  label="Email"
                  value={email || ""}
                  disabled
                  isLight
                />

                <p
                  className={`mt-2 ${
                    error ? "" : "invisible"
                  } text-red-600 text-sm`}
                >
                  {error}
                </p>
              </>
            )}
            <div className="flex justify-end">
              <CtaButton
                type="submit"
                text="Save"
                disabled={isLoading || !isChanged}
              />
            </div>
          </div>
        </form>

        {/*TODO: Change Password */}
        {/*TODO: Delete account */}
      </div>
      <Footer />
    </main>
  );
}

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session || !session.user || !session.user.id) {
    return { redirect: { destination: "/" } };
  }

  const { email, image, id, bio, name } = await getUser(session.user.id);

  return {
    props: {
      user: {
        name: name || "",
        email: email || "",
        image: image || "",
        id: id || "",
        bio: bio || "",
      },
    },
  };
}
