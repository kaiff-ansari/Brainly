import { useRef, useState, type FormEvent } from "react";
import Button from "../components/Button";
import InputFormContent from "../components/InputFormContent";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function signup(e?: FormEvent) {
    if (e) e.preventDefault();
    const username = usernameRef.current?.value?.trim();
    const email = emailRef.current?.value?.trim();
    const password = passwordRef.current?.value;

    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await axios.post(`${BACKEND_URL}/api/v1/auth/register`, {
        username,
        email,
        password
      });

      setSuccess("Account created successfully! Redirecting to sign in...");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (err: any) {
      console.error("Signup failed:", err);
      const msg = err.response?.data?.message || "Signup failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Create an Account</h1>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 text-sm p-3 rounded-md mb-4 text-center">
            {success}
          </div>
        )}

        <form onSubmit={signup} className="flex flex-col gap-3.5">
          <InputFormContent ref={usernameRef} placeholder="Username" />
          <InputFormContent ref={emailRef} placeholder="Email" type="email" />
          <InputFormContent ref={passwordRef} placeholder="Password" type="password" />

          <div className="pt-2">
            <Button
              type="submit"
              onClick={() => signup()}
              loading={loading}
              variant="primary"
              text="Sign Up"
              fullWidth={true}
            />
          </div>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-purple-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;