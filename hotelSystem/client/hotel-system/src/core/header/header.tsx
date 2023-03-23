import { AppBar, styled, Typography } from "@mui/material";
import React from "react";
import { useAuthContext } from "view-model/AuthContext";
import AuthButton from "./components/authButton";
import HeaderButtons from "./components/headerButtons";
import Logo from "./components/logo";
import LogoutButton from "./components/logoutButton";

const MyHeader = styled("div")({
  backgroundColor: "#4FBDCC",
  width: "100%",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "row",
});

const Header = () => {
  const UserAuth = useAuthContext();
  return (
    <MyHeader>
      <Logo />

      <HeaderButtons />
      <div
        style={{
          flex: 1,
          alignItems: "center",
          display: "flex",
          justifyContent: "flex-end",
          marginRight: 30,
        }}
      >
        {(UserAuth.userState === "visitor" && <AuthButton />) ||
          (UserAuth.userState === "registered" && <LogoutButton />)}
      </div>
    </MyHeader>
  );
};

export default Header;
