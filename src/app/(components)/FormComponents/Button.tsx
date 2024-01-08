import React from "react";

type ButtonProps = {
  name: string;
};

const CustomButton = ({ name }: ButtonProps) => {
  return (
    <div>
      <button
        className="block mx-auto mb-6 px-12 h-10 bg-slate-900 text-white hover:bg-slate-700 transition-colors rounded-md w-4/5"
        type="submit"
      >
        {name}
      </button>
    </div>
  );
};

export default CustomButton;
