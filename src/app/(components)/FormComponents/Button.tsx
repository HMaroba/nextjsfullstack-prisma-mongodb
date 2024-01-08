import React from "react";

type ButtonProps = {
  name: string;
};

function Button() {
  return (
    <div>
      <button
        className="block mx-auto mb-6 px-12 h-10 bg-slate-900 text-white hover:bg-slate-700 transition-colors rounded-md w-4/5"
        type="submit"
      >
        Login
      </button>
    </div>
  );
}

export default Button;
