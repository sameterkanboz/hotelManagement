import { Button } from "@mui/material";
import React from "react";

const ImageBackground = () => {
  return (
    <div
      style={{
        backgroundImage: `url(https://www.hotelbristolpalace.it/sites/bristol2torri.gisnet.it/files/Due_Torri_Slideshow_%281440%20%C3%97%20400%20px%29.jpg)`,
        width: "100%",
        height: "400px",
        minHeight: "400px",
        maxHeight: "400px",
        backgroundRepeat: "no-repeat",

        backgroundPosition: "50% 50%",
        backgroundSize: "100% 100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button href="/reservation" disableRipple variant="outlined">
        {" "}
        make a reservation
      </Button>
    </div>
  );
};

export default ImageBackground;
