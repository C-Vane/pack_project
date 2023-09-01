import Image from "next/image";
import homepageImage from "src/assets/images/homepage.png";
import { routes } from "../utils/routes";

export default function Home() {
  return (
    <main>
      <div className="flex h-100% md:h-screen mt-10">
        <div className="lg:w-[57%] my-auto flex flex-col items-center">
          <div className="py-16 px-8 sm:px-12">
            <h1 className="text-5xl md:text-6xl font-bold text-neutralB">
              Engage and retain your employees
            </h1>
            <p className="text-base mt-8 text-neutralB max-w-[65%]">
              Allowing companies to drive thriving growth by exploiting the
              power of personalized development programs and a pool of
              world-star mentors.
            </p>
            <div className="mt-8">
              <a href={routes.signin}>
                <button className="bg-primary-500 hover:bg-white hover:text-primary-500 hover:border-primary-500 hover:border-2 focus:bg-white focus:text-black focus:border-secondary-500 focus:ring-secondary-500 inline-flex items-center px-7 py-3 text-sm text-neutralB font-bold bg-neutralB-700 border-2 border-transparent rounded-[10px] focus:outline-none focus:ring-2">
                  Manage your account
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="w-[43%] h-full hidden lg:block m-auto">
          <Image
            src={homepageImage}
            alt="homepage"
            className="h-inherit object-cover ml-auto"
          />
        </div>
      </div>
    </main>
  );
}
