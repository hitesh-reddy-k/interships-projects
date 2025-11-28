import { createContext, useState } from "react";


export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

  const login = (userdata, jwtToken) => {
    setUser(userdata);
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userdata));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
