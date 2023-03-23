import { Button } from "@mui/material";
import React from "react";
import { useUiContext } from "view-model/uiContext";

const AuthButton = () => {
  const DialogHandler = useUiContext();
  return (
    <Button onClick={() => DialogHandler.handleDialogState(true)}>login</Button>
  );
};

export default AuthButton;
