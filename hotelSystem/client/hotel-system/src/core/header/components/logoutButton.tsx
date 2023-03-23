import { Button } from "@mui/material";
import React from "react";
import { useLogout } from "service/customHooks";

import functionFactory from "service/functionFactory";
import { useAuthContext } from "view-model/AuthContext";

const LogoutButton = () => {
  const log = useLogout();

  return <Button onClick={() => log.mutate()}>logout</Button>;
};

export default LogoutButton;
