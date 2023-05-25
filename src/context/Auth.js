import { createContext, useEffect, useState } from "react";
import React from "react";
import {  useNavigate } from "react-router-dom";

const LocalStorageKeys = {
  USER: "user",
};

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, _setUser] = useState(null);
  const navigate = useNavigate();
  const setUser = (user) => {
    localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(user));
    _setUser(user);
  };

  const signOut = () => {
    localStorage.removeItem(LocalStorageKeys.USER);
    _setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const userData = localStorage.getItem(LocalStorageKeys.USER);
    if (userData) {
      _setUser(JSON.parse(userData));
    } 
  },[]);
 
  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
