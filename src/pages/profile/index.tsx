import { getServerSession } from "next-auth";
import Image from "next/image";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { authOptions } from "../api/auth/[...nextauth]";

import { getUser } from "@/src/utils/db";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

import backgroundPlaceholder from "@/src/assets/images/profile.png";
import profilePlaceholder from "@/src/assets/images/profile_placeholder.png";
import InputField from "@/src/components/InputField";
import { DBUser, UserModifiableAttributes } from "@/src/utils/types";
import { FetchMethod, useApi } from "@/src/hooks/usePost";
import { customApis, routes } from "@/src/utils/routes";
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

  const { id, image, bio, name, email, backgroundImage } = data.id
    ? data
    : user;

  const { startUpload } = useUploadThing("profilePicture");
  const [fields, setFields] = useState<UserModifiableAttributes>({
    image: image || "",
    bio: bio || "",
    name: name || "",
    backgroundImage: backgroundImage || "",
  });
  const [files, setFiles] = useState<File[]>([]);

  const isChanged =
    fields.image !== image ||
    fields.name !== name ||
    fields.bio !== bio ||
    fields.backgroundImage !== backgroundImage;

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
    let profileUrl: string = image;
    let backgroundUrl: string = backgroundImage;

    if ((fields.image || fields.backgroundImage) && files.length) {
      const hasImageChanged = Utils.isBase64Image(fields.image || "");
      const hasBackgroundChanged = Utils.isBase64Image(
        fields.backgroundImage || ""
      );

      if (hasImageChanged || hasBackgroundChanged) {
        const filteredFiles = files.filter((file) => file);
        const response = await startUpload(filteredFiles);

        if (response && response[0]?.url && hasImageChanged) {
          profileUrl = response[0].url;
        }

        if (response && response[0]?.url && !hasImageChanged) {
          backgroundUrl = response[0].url;
        }

        if (response && response[1]?.url) {
          backgroundUrl = response[1].url;
        }
      }
    }

    updateUser({
      name: fields.name,
      bio: fields.bio,
      image: profileUrl,
      backgroundImage: backgroundUrl,
    });
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    isBackground?: boolean
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      var blob = file.slice(0, file.size, "image/png");

      if (!file.type.includes("image")) {
        return;
      }

      const newFile = new File(
        [blob],
        `${id}${isBackground ? "_background" : "_profile"}.png`,
        { type: "image/png" }
      );
      const newFiles = [...files];

      if (isBackground) {
        newFiles[1] = newFile;
      } else {
        newFiles[0] = newFile;
      }

      setFiles(newFiles);

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        const newFields = { ...fields };
        if (isBackground) {
          newFields.backgroundImage = `${imageDataUrl}`;
        } else {
          newFields.image = `${imageDataUrl}`;
        }
        console.log(newFields);
        setFields(newFields);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <main>
      <Header isSignedIn={!!id} />
      <form onSubmit={onSubmit} className="flex flex-col h-100% mt-10">
        <div className="relative">
          <Image
            src={fields.backgroundImage || backgroundPlaceholder}
            width={500}
            height={500}
            alt="meeting picture background"
            className="w-screen md:h-80 lg:h-96 object-cover object-[50%_60%]"
            unoptimized
          />
          <label
            id="background-image"
            className="opacity-0 w-screen md:h-80 lg:h-96 absolute top-0 cursor-pointer hover:opacity-100 hover:backdrop-blur-sm"
          >
            <div>
              <svg
                className="w-8 h-8 mt-24 absolute bottom-2 right-3 text-gray-500 dark:text-gray-400"
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
              id="background-image"
              type="file"
              className="hidden"
              onChange={(e) => handleImage(e, true)}
            />
          </label>
        </div>

        <div className="lg:justify-start">
          <div className="flex justify-center lg:justify-start relative z-10 h-32 w-full border-t-4 border-gray-600">
            <div className="absolute -top-full h-38 md:h-40 lg:h-60 lg:left-20">
              <Image
                src={fields.image || profilePlaceholder}
                alt="user profile picture"
                width={200}
                height={200}
                className="h-full w-auto aspect-square rounded-full object-cover border-4 border-gray-600"
              />

              <label
                htmlFor="profile-image"
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
                  id="profile-image"
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
        </div>

        {/*TODO: Change Password */}
        {/*TODO: Delete account */}
      </form>
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
  try {
    const { email, image, id, bio, name, backgroundImage } = await getUser(
      session.user.id
    );
    return {
      props: {
        user: {
          name: name || "",
          email: email || "",
          image: image || "",
          id: id || "",
          bio: bio || "",
          backgroundImage: backgroundImage || "",
        },
      },
    };
  } catch (error) {
    return { redirect: { destination: routes.signup + "?force='true'" } };
  }
}
