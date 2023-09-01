import { routes } from "@/src/utils/routes";
import Image from "next/image";
import logo from "src/assets/logo/logo_w.png";

const Header = () => {
  return (
    <header>
      <nav className="bg-black fixed w-full z-20 top-0 left-0 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href={routes.home} className="flex items-center">
            <Image
              src={logo}
              className="mr-3 h-20 sm:h-12 w-auto sm:my-[0.3rem]"
              alt="Pack Logo"
            />
          </a>
          <div className="flex md:order-2">
            <a
              href={routes.signin}
              className="bg-secondary-500 hover:bg-white hover:text-secondary-500 hover:border-secondary-500 hover:border-2 focus:bg-white focus:border-primary-500 focus:ring-primary-500 focus:text-primary-500 inline-flex items-center px-7 py-3 text-sm text-neutralB font-bold bg-neutralB-700 border-2 border-transparent rounded-[10px] focus:outline-none focus:ring-2"
            >
              Login
            </a>
          </div>

          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-11 lg:mt-0">
              <li>
                <a
                  href="https://thepack.tech/why-pack"
                  className="block py-2 pr-4 pl-3 text-white hover:ring-primary-500 font-bold rounded lg:bg-transparent lg:p-0"
                  target="_blank"
                >
                  Why Pack?
                </a>
              </li>
              <li>
                <a
                  href="https://thepack.tech/solutions"
                  className="block py-2 pr-4 pl-3 text-white hover:ring-primary-500 font-bold rounded lg:bg-transparent lg:p-0"
                  target="_blank"
                >
                  Solutions
                </a>
              </li>
              <li>
                <a
                  href="https://thepack.tech/about"
                  className="block py-2 pr-4 pl-3 text-white hover:ring-primary-500 font-bold rounded lg:bg-transparent lg:p-0"
                  target="_blank"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
