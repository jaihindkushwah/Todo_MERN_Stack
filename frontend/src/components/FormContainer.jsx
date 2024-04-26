import React from "react";

function FormContainer({ title, children, className, ...props }) {
  return (
    <div
      className={`flex gap-6 flex-col bg-gradient-to-r from-violet-300 to-gray-400 p-10 rounded ${className}`}
      {...props}
    >
      <h1 className="text-center text-2xl">{title}</h1>
      <div className="flex flex-col gap-2 pb-5 mt-10 sm:gap-3">{children}</div>
    </div>
  );
}

export default FormContainer;
