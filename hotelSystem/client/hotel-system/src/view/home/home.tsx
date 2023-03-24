import { Button, Card, Typography } from "@mui/material";
import axios from "axios";
import MyCard from "core/card/MyCard";
import Header from "core/header/header";
import React, { useEffect, useState } from "react";
import { useCreatePerson, useGetData, useLogout } from "service/customHooks";
import functionFactory from "service/functionFactory";
import { useAuthContext } from "view-model/AuthContext";
import ImageBackground from "./components/imageBackground";

const Home = () => {
  const { response, loading, error } = useGetData({
    method: "get",
    url: "/rooms",
    headers: JSON.stringify({ accept: "*/*" }),
  });
  const Name = useAuthContext();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);
  const logout = useCreatePerson({ url: "/logout", method: "post" });

  return (
    <div>
      <ImageBackground />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "20px",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <Typography>
          {(Name.userState === "visitor" &&
            "Hello Visitor, if you want, you can view our rooms here. You can also login from above") ||
            (Name.userState === "registered" &&
              "Welcome" + " " + Name.name + "!")}
        </Typography>

        {loading ? (
          <p>loading...</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "20px",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            {data.map(
              (
                value: {
                  room_type: string;
                  id: number;
                  capacity: number;
                  image: string;
                  description: string;
                },
                index
              ) => {
                return (
                  <MyCard
                    description={value.description}
                    header={value.room_type}
                    imageUrl={value.image}
                    key={index}
                  />
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
