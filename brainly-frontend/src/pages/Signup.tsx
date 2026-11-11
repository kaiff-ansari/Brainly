import type { InputHTMLAttributes } from "react"
import { useRef } from "react";
import Button from "../components/Button"
import InputFormContent from "../components/InputFormContent"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import axios from "axios"


const Signup = () => {


  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
        username,
        email,
        password
      });

      navigate("/signin");
      alert("You have successfully signed up!");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  }


  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">

      <div className="bg-white rounded-xl border min-w-48 p-8">
        <InputFormContent ref={usernameRef} placeholder="Username" />
        <InputFormContent ref={emailRef} placeholder="Email" />
        <InputFormContent ref={passwordRef} placeholder="Password" />

        <div className="flex justify-center pt-4">
          <Button onClick={signup} loading={false} variant="primary" text="Sign Up" fullWidth={true} />
        </div>

      </div>


    </div>
  )
}

export default Signup