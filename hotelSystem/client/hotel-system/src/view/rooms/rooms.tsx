import MyCard from "core/card/MyCard";
import React, { useEffect, useState } from "react";
import { useGetData } from "service/customHooks";
import RoomsContainer from "./components/roomsContainer";

const Rooms = () => {
  const { response, loading, error } = useGetData({
    method: "get",
    url: "/rooms",
    headers: JSON.stringify({ accept: "*/*" }),
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);
  console.log(error);
  return (
    <RoomsContainer>
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
    </RoomsContainer>
  );
};

export default Rooms;
