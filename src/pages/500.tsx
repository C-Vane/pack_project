import Image from "next/image";
import logo from "src/assets/logo/logo_w.png";
import { routes } from "../utils/routes";

export default function NotFound() {
  return (
    <main>
      <section className="bg-black text-neutralW h-screen px-8 w-100%">
        <a href={routes.home} className="flex items-center">
          <Image
            src={logo}
            className="h-28 sm:h-20 m-auto w-auto"
            alt="Pack Logo"
          />
        </a>
        <div className="flex h-[calc(100%-6rem)] justify-center items-center m-auto">
          <div className="flex flex-col md:flex-row gap-16">
            <h1 className="text-primary-500 text-9xl text-center md:text-start">
              500
            </h1>{" "}
            <div className="flex flex-col justify-center text-center md:text-start text-white">
              <h1 className="text-3xl">
                Ooops... <br /> server is down!
              </h1>{" "}
              <p className="max-w-sm mt-3">
                Please wait a moment and start over again from the home page!
              </p>{" "}
              <div className="self-center md:self-end mt-8">
                <a href={routes.home} target="_self">
                  <button className="bg-primary-500 hover:bg-white hover:text-primary-500 hover:border-primary-500 hover:border-2 focus:bg-white focus:text-black focus:border-secondary-500 focus:ring-secondary-500 inline-flex items-center px-7 py-3 text-sm text-neutralB font-bold bg-neutralB-700 border-2 border-transparent rounded-[10px] focus:outline-none focus:ring-2">
                    Homepage
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
