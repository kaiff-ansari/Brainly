
interface InputProps {
  placeholder: string;
  ref?: any;
}

const InputFormContent = ({placeholder, ref}: InputProps) => {
  return (
    <div>
        <input ref={ref} placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-2"></input>
    </div>
  )
}

export default InputFormContent