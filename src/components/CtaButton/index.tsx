import { ButtonHTMLAttributes } from "react";

interface CtaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  text: string;
  isSecondary?: boolean;
}

const CtaButton = ({
  className,
  to,
  text,
  isSecondary,
  ...props
}: CtaButtonProps) => {
  return (
    <a href={to || "#"}>
      <button
        className={`${
          isSecondary
            ? "bg-secondary-500 hover:text-secondary-500 hover:border-secondary-500 focus:border-primary-500 focus:ring-primary-500 focus:text-primary-500"
            : "bg-primary-500 hover:text-primary-500 hover:border-primary-500  focus:border-secondary-500 focus:ring-secondary-500 focus:text-black"
        }
        ${
          props.disabled
            ? "opacity-25 cursor-not-allowed hover:text-black"
            : "hover:bg-white"
        }
      bg-neutralB-700 hover:border-2 focus:bg-white inline-flex items-center px-7 py-3 text-sm text-neutralB font-bold bg-neutralB-700 border-2 border-transparent rounded-[10px] focus:outline-none focus:ring-2 `.concat(
          className || ""
        )}
        {...props}
      >
        {text}
      </button>
    </a>
  );
};

export default CtaButton;
