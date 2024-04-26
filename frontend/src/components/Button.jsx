import React from "react";
import { CircularProgress } from "@chakra-ui/react";
function Button({ title, isLoading, className, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`bg-violet-500 text-white rounded-full p-2 `  + className}
      {...props}
    >
      {isLoading ? (
        <CircularProgress isIndeterminate size={18} color="blue" />
      ) : (
        title
      )}
    </button>
  );
}

export default Button;
