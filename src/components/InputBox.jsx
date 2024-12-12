import React, { useId } from "react";

const InputBox = ({ type, placeholder, name, className = "", ...props }) => {
  const id = useId();
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className={`${className} bg-transparent border border-yellow-700 py-1 px-5`}
      {...props}
    />
  );
};

export default InputBox;
