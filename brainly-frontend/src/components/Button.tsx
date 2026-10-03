import type { ReactElement } from "react";
 interface ButtonProps{
 
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;

}

const variantStles = {

  "primary" : "bg-purple-600 text-white",
  "secondary" : "bg-purple-400 text-purple-600"
}

const sizeStyles = {

  "sm" : "py-1 px-2",
  "md" : "py-2 px-4",
  "lg" : "py-4 px-6"
}

const defaultStyle = "rounded-md p-4"

const Button = (props: ButtonProps) => {


  return <button className={`${variantStles[props.variant]} ${defaultStyle} ${sizeStyles[props.size]}`}>{props.text}</button>
}

export default Button