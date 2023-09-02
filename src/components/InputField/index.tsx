import { InputHTMLAttributes } from "react";

interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  isLight?: boolean;
  isLongText?: boolean;
}

const InputField = ({
  className,
  label,
  error,
  isLight,
  isLongText,
  ...props
}: InputFieldProps) => {
  const inputProps = {
    ...props,
    id: props.name,
    className:
      `border peer sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
        isLight
          ? "bg-gray-100 border-gray-500 placeholder-gray-500 text-black"
          : "bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
      } focus:ring-blue-500 focus:border-blue-500 ${
        error ? "invalid:border-red-500 invalid:text-red-600" : ""
      }`.concat(className || ""),
  };
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block mb-2 text-sm font-medium text-white"
      >
        {label}
      </label>
      {isLongText ? <textarea {...inputProps} /> : <input {...inputProps} />}
      <p className={`mt-2 ${error ? "" : "invisible"} text-red-600 text-sm`}>
        {error}
      </p>
    </div>
  );
};

export default InputField;
