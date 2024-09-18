import { useDispatch } from "react-redux";
import { Button } from "../../../Components/ui/button";
import { Input } from "../../../Components/ui/input";
import { Label } from "../../../Components/ui/label";
import { useEffect, useState } from "react";
import { login } from "../../../Redux/Store/Feature/authSlice";
import { AnyAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/store";
import Loading from "../../../Components/Loading";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const status = useSelector((state: RootState) => state.auth.status);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = { email: username, password };
      const response = await dispatch(login(userData) as unknown as AnyAction);
      // Redirect to dashboard or home page
      console.log(response, "response");
      if (response.error) {
        alert(response.error.message);
      } else {
        window.location.href = "/conversation";
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(status, "status");
  }, [status]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <Loading isLoading={status == "loading"}></Loading>
      <div className="relative w-1/2">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-10 w-24 h-24 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Login form */}
        <div className="relative bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-lg max-w-6xl w-full">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Title and decorative elements */}
            <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col justify-center items-center">
              <h2 className="text-4xl font-bold text-white mb-6 text-center">
                Welcome Back
              </h2>
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg
                  className="w-20 h-20 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Right side - Input fields */}
            <div className="md:w-1/2 md:pl-8">
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 placeholder:text-white bg-white bg-opacity-20 border-transparent focus:border-white focus:bg-opacity-30 text-white placeholder-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="mt-1 placeholder:text-white bg-white bg-opacity-20 border-transparent focus:border-white focus:bg-opacity-30 text-white placeholder-gray-200"
                  />
                </div>
                <div className="mt-7 gap-4 flex flex-col">
                  <Button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-2 px-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-white border-2 text-white font-semibold py-2 px-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:bg-opacity-10"
                  >
                    Register
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-white hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
