import { Button, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import functionFactory from "service/functionFactory";

const Register = () => {
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
      <TextField onChange={(e) => SetName(e.target.value)} placeholder="name" />
      <TextField
        onChange={(e) => SetEmail(e.target.value)}
        placeholder="email"
      />
      <TextField
        onChange={(e) => SetPassword(e.target.value)}
        placeholder="password"
      />
      <Button onClick={submit}>register</Button>
    </div>
  );
};

export default Register;
