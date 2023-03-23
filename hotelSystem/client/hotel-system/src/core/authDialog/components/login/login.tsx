import { Button, Card, TextField, Typography } from "@mui/material";

import React, { FormEvent, SyntheticEvent, useState } from "react";
import { useCreatePerson, useGetData, useLogin } from "service/customHooks";
import functionFactory from "service/functionFactory";
import { useAuthContext } from "view-model/AuthContext";
import { useUiContext } from "view-model/uiContext";

const Login = () => {
  const AuthPages = useUiContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, password);

  const login = useLogin();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    login.mutate({ body: { email: email, password: password } });
  };

  return (
    <form onSubmit={submit}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <Typography variant="h5">Login</Typography>

        <div
          style={{
            gap: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 300,
          }}
        >
          <TextField
            type="email"
            required
            style={{ width: 300 }}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <TextField
            type={"password"}
            required
            style={{ width: 300 }}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>

        <Button variant="outlined" type="submit">
          login
        </Button>

        <Typography>
          not a member?
          <a
            style={{ cursor: "pointer", color: "#4FBDCC" }}
            onClick={() => AuthPages.handleAuthState("register")}
          >
            {" "}
            Sign Up
          </a>
        </Typography>
      </div>
    </form>
  );
};

export default Login;
