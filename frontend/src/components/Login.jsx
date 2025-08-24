import React from "react";
import { FcGoogle } from "react-icons/fc";   // Google icon
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        // Send code to backend
        const response = await axios.post("http://localhost:3000/api/auth/google", {
          code: authResult.code,
        });

        if (response.data.token) {
          console.log("✅ Logged in successfully");
          console.log("User:", response.data.user);
          console.log("JWT Token:", response.data.token);

          // Save user & token in localStorage
          const { email, name, image } = response.data.user;
          const token = response.data.token;
          const obj = { email, name, image, token };

          localStorage.setItem("user-info", JSON.stringify(obj));

          // Redirect to dashboard
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("❌ Error while requesting google code:", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",  // tells Google to send auth code
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={googleLogin}
        className="flex hover:cursor-pointer items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-bold hover:bg-gray-100"
      >
        <FcGoogle size={24} />
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
