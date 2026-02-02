import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isloggedin, setIsloggedin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storeduser = localStorage.getItem("loggedinuser");

    if (storeduser) {
      setUser(JSON.parse(storeduser));
      setIsloggedin(true);
    }
  }, []);

  const login = (userdata) => {
    localStorage.setItem("loggedinuser", JSON.stringify(userdata));
    setUser(userdata);
    setIsloggedin(true);
  };
  const logout = () => {
    localStorage.removeItem("loggedinuser");
    setUser(null);
    setIsloggedin(false);
  };

  return (
    <AuthContext.Provider value={{ isloggedin, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
