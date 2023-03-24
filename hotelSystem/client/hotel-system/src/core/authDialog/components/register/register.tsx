import { Button, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import functionFactory from "service/functionFactory";
import { useUiContext } from "view-model/uiContext";

const Register = () => {
  const AuthPages = useUiContext();
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await functionFactory.signUp({
      body: { name: name, email: email, password: password },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Register</Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <TextField
          onChange={(e) => SetName(e.target.value)}
          placeholder="name"
        />
        <TextField
          onChange={(e) => SetEmail(e.target.value)}
          placeholder="email"
        />
        <TextField
          onChange={(e) => SetPassword(e.target.value)}
          placeholder="password"
        />
      </div>

      <Button variant="outlined" onClick={submit}>
        register
      </Button>
      <Typography>
        already have an account?{" "}
        <a
          style={{ cursor: "pointer", color: "#4FBDCC" }}
          onClick={() => AuthPages.handleAuthState("login")}
        >
          {" "}
          Log In
        </a>
      </Typography>
    </div>
  );
};

export default Register;
