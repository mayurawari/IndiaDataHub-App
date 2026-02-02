import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export const Login = () => {
  const [userdata, setUserdata] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isloggedin, user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserdata({ ...userdata, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { username, password } = userdata;
    const storedUserdata = JSON.parse(localStorage.getItem("users")) || [];

    for (let i = 0; i < storedUserdata.length; i++) {
      if (
        storedUserdata[i].username === username &&
        storedUserdata[i].password === password
      ) {
        setError("");
        setTimeout(() => {
          setLoading(false);
        }, 2000);
        login(storedUserdata[i]);
        navigate("/");
        return;
      }
    }

    setError("Invalid username or password");
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md sm:max-w-lg border-2 border-black rounded-3xl bg-yellow-300 shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold text-center p-4">
          Login
        </h1>

        <hr className="border-black" />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 px-6 sm:px-10 py-6"
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
              className="px-3 py-2 rounded-lg border border-black focus:outline-none focus:ring-1 focus:ring-black bg-yellow-100"
              placeholder="Type your username"
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
              className="px-3 py-2 rounded-lg border border-black focus:outline-none focus:ring-1 focus:ring-black bg-yellow-100"
              placeholder="••••••"
            />
          </div>

          {error && (
            <div className="w-full bg-red-400 p-2 rounded-2xl text-center">
              <p className="text-red-700 text-sm font-medium">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-2 rounded-xl font-bold border-2 border-black transition
              ${
                loading
                  ? "bg-yellow-200 cursor-not-allowed"
                  : "bg-black text-yellow-300 hover:bg-yellow-400 hover:text-black"
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <span className="mt-8 text-sm sm:text-base text-center">
        Register here if not registered?{" "}
        <Link to="/register" className="text-blue-500 hover:text-blue-700">
          Register
        </Link>
      </span>
    </div>
  );
};
