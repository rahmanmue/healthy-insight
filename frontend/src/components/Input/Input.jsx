import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Input = ({ label, name, type, placeholder, ...restProps }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-4">
      <label
        className="block text-md font-semibold leading-6 text-gray-900 my-2"
        htmlFor={name}
      >
        {label}
      </label>
      {type === "password" ? (
        <div className="relative">
          <input
            className="py-3 ps-4 pe-10 block w-full border-2 border-gray-200 focus:outline-none  rounded-lg text-md font-medium focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:pointer-events-none"
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            name={name}
            id={name}
            {...restProps}
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer "
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>
      ) : (
        <>
          <input
            className="py-3 ps-4 pe-5 block w-full border-2 border-gray-200 rounded-lg text-md font-medium focus:border-blue-500 focus:border-1 focus:ring-blue-500 focus:outline-none "
            type={type}
            placeholder={placeholder}
            name={name}
            id={name}
            {...restProps}
          />
        </>
      )}
    </div>
  );
};

export default Input;
