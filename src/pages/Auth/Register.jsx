import { useNavigate } from "react-router";
import { Button } from "../../components/Button";
import { useState } from "react";

export const Register = () => {
  const [userdata, setUserdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserdata({ ...userdata, [id]: value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password } = userdata;

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    let existinguser = JSON.parse(localStorage.getItem("users")) || [];
    
    for(let i =0;i<existinguser?.length;i++){
         if(existinguser && existinguser[i].username === username){
            setError("User already exists with same username. Please login.");
            return;
         }
         else if (existinguser[i].email === email){
            setError("User already exists with same email. Please login.");
            return;
         }
    }
    

    let newuserdata = [...existinguser || [], userdata];
    localStorage.setItem("users", JSON.stringify(newuserdata));
    navigate("/login");
  };

  const onLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="w-full min-h-screen">
      <header className="h-24 bg-yellow-300 flex items-center justify-between px-10 border-b-2 border-black">
        <h1 className="font-medium text-4xl text-black hover:text-gray-600 cursor-pointer">
          IDH-IndiaDataHub
        </h1>

        <div className="flex gap-2  justify-center items-center">
          <p className="text-s text-center text-black/70 ">
            Already have an account?{" "}
          </p>
          <Button Text="Login" onClick={onLoginClick} />
        </div>
      </header>

      <div className="flex justify-center items-center mt-20">
        <div className="w-105 border-2 border-black rounded-3xl bg-yellow-300 shadow-lg">
          <h2 className="text-2xl font-bold text-center p-4">Create Account</h2>

          <hr className="border-black" />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 px-10 py-6"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="font-medium">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={userdata.username}
                onChange={handleChange}
                className="px-3 py-2 rounded-lg  bg-yellow-100 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={userdata.email}
                onChange={handleChange}
                className="px-3 py-2 rounded-lg  bg-yellow-100 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Type your email"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={userdata.password}
                onChange={handleChange}
                className="px-3 py-2 rounded-lg  bg-yellow-100 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="••••••"
              />
            </div>

            {error && (
                <div className="w-full justify-center items-center bg-red-400 p-2 rounded-2xl">
                    <p className="text-red-700 text-sm font-medium">{error}</p>
                </div>
            )}

            <button
              type="submit"
              className="mt-2 py-2 rounded-xl font-bold border-2 border-black bg-black text-yellow-300 hover:bg-yellow-400 hover:text-black transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
