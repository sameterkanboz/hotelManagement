import { Button, styled, Typography } from "@mui/material";
import React from "react";

const MyLogo = styled(Typography)({
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  fontFamily: "sans-serif",
  fontWeight: "800",
  fontSize: 24,
});

const Logo = () => {
  return (
    <Button
      disableRipple
      href="/"
      style={{
        color: "black",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MyLogo>LOGO</MyLogo>
    </Button>
  );
};

export default Logo;
