import React, { createContext,  useEffect,  useState } from "react";

const CreateUserContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);
  
  return (
    <CreateUserContext.Provider value={{ user, setUser }}>
      {children}
    </CreateUserContext.Provider>
  );
};

export const UserState = () => {
  return React.useContext(CreateUserContext);
};

export default AuthProvider;
