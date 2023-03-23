import { Button, ButtonGroup, Dialog, DialogContent } from "@mui/material";
import React from "react";
import { AuthState, useUiContext } from "view-model/uiContext";
import Login from "./components/login/login";
import Register from "./components/register/register";

const MyDialog = () => {
  const DialogState = useUiContext();
  return (
    <Dialog
      open={DialogState.dialog}
      onClose={() => DialogState.handleDialogState(false)}
    >
      <DialogContent style={{ height: 380, width: 400 }}>
        <div style={{ marginTop: 20 }}>
          {DialogState.authPage === "login" && <Login />}
          {DialogState.authPage === "register" && <Register />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
