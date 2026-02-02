import { useContext } from "react";
import { Login } from "./Auth/Login";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import logo from "../assets/favIDH.png";

export const Home = () => {
  const { isloggedin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isloggedin) navigate("/dashboard");
  };

  return (
    <div className="w-full min-h-screen">
      <header className="h-20 sm:h-24 bg-yellow-300 flex items-center justify-center gap-2 sm:gap-3 px-4">
        <img
          src={logo}
          alt="IDH"
          className="w-8 h-8 sm:w-10 sm:h-10"
        />
        <h1 className="font-medium text-xl sm:text-3xl lg:text-4xl text-black hover:text-gray-600">
          IDH-IndiaDataHub
        </h1>
      </header>

      <section className="flex flex-col justify-center items-center text-center px-4 py-12 sm:py-20">
        {isloggedin ? (
          <div className="flex flex-col justify-center items-center w-full max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extralight text-black">
              Welcome to
            </h1>

            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-medium text-black my-4 sm:my-6">
              India Data Hub
            </h2>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-black mb-6">
              Dashboard
            </h3>

            <Button Text="Get Started →" onClick={handleGetStarted} />
          </div>
        ) : (
          <div className="w-full max-w-md">
            <Login />
          </div>
        )}
      </section>
    </div>
  );
};
