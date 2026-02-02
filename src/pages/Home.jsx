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
    if (isloggedin)
    navigate("/dashboard");
  };
  return (
    <div className="w-full">
      <header className="h-24 bg-yellow-300 flex items-center justify-center">
        <img src={logo} alt="IDH" width={40} height={40} />
        <h1 className="font-medium text-4xl text-black hover:text-gray-600">
          IDH-IndiaDataHub
        </h1>
      </header>
      <section className="flex flex-col justify-center items-center">
        {isloggedin ? (
          <div className="flex flex-col justify-center items-center w-full m-30">
            <h1 className="text-4xl font-extralight text-black">Welcome to</h1>
            <h2 className="text-8xl font-medium text-black m-5">
              {" "}
              India Data Hub{" "}
            </h2>
            <h3 className="text-2xl font-light text-black mb-5">DashBoard</h3>
            <Button Text="Get Started ->" onClick={handleGetStarted} />
          </div>
        ) : (
          <Login />
        )}
      </section>
    </div>
  );
};

// https://restcountries.com/v3.1/all?fields=name,region,subregion,population,independent
