import type { ReactElement } from "react";
interface ButtonProps {

  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;

}

const variantClasses = {

  "primary": "bg-purple-600 text-white",
  "secondary": "bg-purple-200 text-purple-600"
}


const defaultStyle = "px-4 py-2 rounded-md font-light flex items-center"

const Button = ({ variant, text, startIcon }: ButtonProps) => {


  return <button className={`${variantClasses[variant]} ${defaultStyle}`}>

    <div className="pr-2">
      {startIcon}
    </div>
    {text}
  </button>
}

export default Button