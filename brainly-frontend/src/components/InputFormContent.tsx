
import type { Ref, ChangeEvent } from "react";

interface InputProps {
  placeholder: string;
  ref?: Ref<HTMLInputElement>;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputFormContent = ({
  placeholder,
  ref,
  type = "text",
  value,
  onChange,
  className = ""
}: InputProps) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${className}`}
      />
    </div>
  );
};

export default InputFormContent;