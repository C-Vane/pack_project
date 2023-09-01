import Image from "next/image";
import logo from "src/assets/logo/logo_w.png";

const Footer = () => {
  return (
    <footer className="bg-black w-full px-4 lg:px-6 py-2.5">
      <div className="mx-auto pb-12 py-4 container px-4">
        <Image className="py-4 w-40 -ml-3" src={logo} alt="logo" />
        <div className="flex md:flex-row flex-col text-white ml-4">
          <div className="md:w-1/2 md:mr-16 py-8 md:py-0">
            <div>
              <p className="text-sm">Let&apos;s keep in touch</p>
              <div className="flex flex-row w-full mt-4 mb-2">
                <input
                  className="rounded-[10px] px-4 py-2 w-full mr-6 focus:outline-primary-500 text-black"
                  type="text"
                  placeholder="Email address"
                />
                <button className="px-8 py-2 border-primary-500 hover:bg-primary-500 hover:text-black border-2 rounded-[10px] ml-auto text-primary-500">
                  Subscribe
                </button>
              </div>
              <p className="text-[11px]">
                By submitting your email, you agree to our
                <a href="/terms-and-conditions">Terms&amp;Conditions</a>
                and <a href="/privacy-policy">Privacy Policy</a>
              </p>
            </div>
          </div>
          <div className="flex flex-row md:w-2/5">
            <div className="w-1/2 text-[16px] items-center">
              <a href="/about">
                <p>About Us</p>
              </a>
              <a href="/why-pack">
                <p>Why Pack?</p>
              </a>
              <a
                href="https://meetings-eu1.hubspot.com/pietro-maria"
                target="_blank"
              >
                <p>Contact Us</p>
              </a>
              <a
                href="https://oux7nc0tq6b.typeform.com/to/ZzOZv82W"
                target="_blank"
              >
                <p>Become Mentor</p>
              </a>
            </div>
            <div className="w-1/2 text-[16px]">
              <a href="/privacy-policy">
                <p>Privacy Policy</p>
              </a>
              <a href="/terms-and-conditions">
                <p>Terms &amp; Condition</p>
              </a>
              <a href="/cookie-policy">
                <p>Cookies Policy</p>
              </a>
              <a
                href="https://drive.google.com/drive/folders/1kFjVmiUt3LJB7KuEtSJ3qyJ5wQaAtYYW?usp=sharing"
                target="_blank"
              >
                <p>Press &amp; Media Kit</p>
              </a>
            </div>
          </div>
          <div className="md:w-1/10 flex md:flex-col flex-row justify-start items-center gap-3 md:justify-normal mt-8 md:mt-0 md:ml-4">
            <a
              href="https://it.linkedin.com/company/pack-mentoring"
              target="_blank"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M29.5712 0.272461H6.42885C2.8783 0.272461 0 3.33916 0 7.12212V31.7793C0 35.5622 2.8783 38.6289 6.42885 38.6289H29.5712C33.1217 38.6289 36 35.5622 36 31.7793V7.12212C36 3.33916 33.1217 0.272461 29.5712 0.272461Z"
                  fill="#EEEEF0"
                ></path>
                <path
                  d="M13.5637 15.1687H9.83691V27.9865H13.5637V15.1687Z"
                  fill="#101410"
                ></path>
                <path
                  d="M11.6811 13.4947C12.8956 13.4947 13.8823 12.4353 13.8823 11.1252C13.8823 9.81513 12.8956 8.75574 11.6811 8.75574C10.4667 8.75574 9.47998 9.81513 9.47998 11.1252C9.47998 12.4353 10.4667 13.4947 11.6811 13.4947Z"
                  fill="#101410"
                ></path>
                <path
                  d="M19.5218 21.2663C19.5218 19.4629 20.3035 18.3873 21.7912 18.3873C23.1574 18.3873 23.8178 19.4144 23.8178 21.2663V27.9946H27.5218V19.8753C27.5218 16.4383 25.6925 14.7805 23.1422 14.7805C20.592 14.7805 19.5142 16.8993 19.5142 16.8993V15.1687H15.9392V27.9865H19.5142V21.2582L19.5218 21.2663Z"
                  fill="#101410"
                ></path>
              </svg>
            </a>
            <a href="https://t.me/+WjQVqb5SxNQ4NTJk" target="_blank">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_108_1711)">
                  <path
                    d="M29.5712 0H6.42884C2.87829 0 0 2.87829 0 6.42884V29.5712C0 33.1217 2.87829 36 6.42884 36H29.5712C33.1217 36 36 33.1217 36 29.5712V6.42884C36 2.87829 33.1217 0 29.5712 0Z"
                    fill="#EEEEF0"
                  ></path>
                  <path
                    d="M26.7627 10.6869C26.6944 10.4896 26.6109 10.4289 26.4819 10.3833C26.201 10.2771 25.7229 10.4365 25.7229 10.4365C25.7229 10.4365 8.90313 16.4858 7.93918 17.1537C7.73425 17.2979 7.66593 17.3814 7.62798 17.4801C7.461 17.9583 7.97713 18.1708 7.97713 18.1708L12.3111 19.5826C12.3111 19.5826 12.4705 19.6053 12.5312 19.5674C13.5179 18.945 22.4515 13.2979 22.9676 13.1082C23.0511 13.0854 23.1119 13.1082 23.0967 13.1689C22.8917 13.89 15.127 20.7894 15.127 20.7894C15.127 20.7894 15.0967 20.8274 15.0815 20.8729H15.0739L14.6716 25.1689C14.6716 25.1689 14.5046 26.4896 15.8177 25.1689C16.7437 24.2429 17.647 23.4611 18.0948 23.0816C19.5824 24.1139 21.1916 25.2524 21.8823 25.8444C22.2314 26.1404 22.5198 26.1936 22.7627 26.186C23.423 26.1632 23.6052 25.4422 23.6052 25.4422C23.6052 25.4422 26.6716 13.1082 26.7703 11.4535C26.7779 11.2941 26.7931 11.1879 26.7931 11.074C26.7931 10.9222 26.7779 10.7628 26.7551 10.6945L26.7627 10.6869Z"
                    fill="#101410"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_108_1711">
                    <rect width="36" height="36" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
