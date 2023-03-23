import axios from "axios";
import React, { ReactNode, useContext, useEffect, useState } from "react";
export type UserType = "visitor" | "registered" | "loading";

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface AuthContextModel {
  userState: UserType;
  name: string;
  handleUserState: (newState: UserType) => void;
}

export const AuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userState, setUserState] = useState<UserType>("registered");
  const [name, setName] = useState("");

  function handleUserState(newState: UserType) {
    setUserState(newState);
  }
  useEffect(() => {
    axios
      .get("http://localhost:4000/user", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setUserState("registered");
        console.log(res.data);

        setName(res.data.name);
      })
      .catch((err) => {
        setUserState("visitor");
        console.log(err.response.data.message);
      })
      .finally(() => {
        console.log("done");
      });
  }, [name]);

  const values = {
    name,
    userState,
    handleUserState,
  };

  return (
    <AuthContext.Provider value={values}> {children}</AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextModel => {
  return useContext(AuthContext);
};
