import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const variantClasses = {
  "primary": "bg-purple-600 text-white hover:bg-purple-700",
  "secondary": "bg-purple-200 text-purple-600 hover:bg-purple-300"
};

const defaultStyle = "px-4 py-2 rounded-md font-medium flex items-center cursor-pointer transition-colors";

const Button = ({ variant, text, startIcon, onClick, fullWidth, loading, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variantClasses[variant]} ${defaultStyle} ${fullWidth ? "w-full justify-center" : ""} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={loading}
    >
      {startIcon && <div className="pr-2 flex items-center">{startIcon}</div>}
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;