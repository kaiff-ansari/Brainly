import type { ReactElement } from "react";
interface ButtonProps {

  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick: () => void;

}

const variantStles = {

  "primary": "bg-purple-600 text-white",
  "secondary": "bg-purple-400 text-purple-600"
}

const sizeStyles = {

  "sm": "py-1 px-2 text-sm rounded-sm",
  "md": "py-2 px-4 text-md rounded-md",
  "lg": "py-4 px-8 text-lg rounded-lg"
}

const defaultStyle = "rounded-md flex"

const Button = (props: ButtonProps) => {


  return <button className={`${variantStles[props.variant]} ${defaultStyle} ${sizeStyles
  [props.size]}`}>
    {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIcon}
  </button>
}

export default Button