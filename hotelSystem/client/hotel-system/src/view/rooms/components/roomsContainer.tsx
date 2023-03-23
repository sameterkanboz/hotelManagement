import { Typography } from "@mui/material";
import React from "react";

const RoomsContainer = ({ children }: { children?: JSX.Element }) => {
  return (
    <div>
      <div
        style={{
          height: 60,

          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          textAlign: "center",
        }}
      >
        <Typography variant="h2">Our Rooms</Typography>
      </div>
      {children}
    </div>
  );
};

export default RoomsContainer;
