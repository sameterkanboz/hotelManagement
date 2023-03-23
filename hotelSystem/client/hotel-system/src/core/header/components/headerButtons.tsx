import { Button, styled } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const MyHeaderButton = styled(Button)<{ even?: number; selected?: boolean }>(
  ({ even, selected }) => ({
    backgroundColor: selected ? "#fff" : "#3EA3B0",
    color: selected ? "#3c52b2" : "black",
    width: "100%",
    height: "60px",
    display: "flex",
    borderRadius: 0,
    "&:hover": {
      backgroundColor: "#fff",
      color: "#3c52b2",
    },
  })
);

const HeaderButtons = () => {
  const location = useLocation();
  console.log(location.pathname.split("/")[1]);
  return (
    <div style={{ flex: 2, flexDirection: "row", display: "flex" }}>
      {["customer", "employees", "rooms"].map((value, index) => {
        return (
          <MyHeaderButton
            selected={location.pathname.split("/")[1] === value}
            href={"/" + value}
            disableRipple
            key={value}
            even={(index %= 2)}
          >
            {value}
          </MyHeaderButton>
        );
      })}
    </div>
  );
};

export default HeaderButtons;
