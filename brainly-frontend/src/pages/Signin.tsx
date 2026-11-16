import { useRef, useState, type FormEvent } from "react";
import axios from "axios";
import Button from "../components/Button";
import InputFormContent from "../components/InputFormContent";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signin = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, {
        email,
        password
      });

      const jwtToken = response.data.token;
      localStorage.setItem("jwtToken", jwtToken);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Signin failed:", err);
      const msg = err.response?.data?.message || "Signin failed. Please check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back</h1>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={signin} className="flex flex-col gap-3.5">
          <InputFormContent ref={emailRef} placeholder="Email" type="email" />
          <InputFormContent ref={passwordRef} placeholder="Password" type="password" />

          <div className="pt-2">
            <Button
              type="submit"
              onClick={() => signin()}
              loading={loading}
              variant="primary"
              text="Sign In"
              fullWidth={true}
            />
          </div>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;