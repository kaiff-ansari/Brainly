import { useRef } from "react"
import axios from "axios"
import Button from "../components/Button"
import InputFormContent from "../components/InputFormContent"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"



const SignIn = () => {

  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate();


  const signin = async () => {

  
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {

      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, {
        email,
        password
      })

      const jwtToken = response.data.token;
      localStorage.setItem("jwtToken", jwtToken);
      navigate("/dashboard");

    } catch (error) {
      console.error("Signin failed:", error);
      alert("Signin failed. Please try again.");
    }






  }
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">

      <div className="bg-white rounded-xl border min-w-48 p-8">
      
        <InputFormContent ref={emailRef} placeholder="Email" />
        <InputFormContent ref={passwordRef} placeholder="Password" />

        <div className="flex justify-center pt-4">
          <Button onClick={signin} loading={false} variant="primary" text="Sign In" fullWidth={true} />
        </div>

      </div>


    </div>
  )
}

export default SignIn