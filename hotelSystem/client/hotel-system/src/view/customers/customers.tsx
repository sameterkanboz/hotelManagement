import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useCreatePerson,
  useDeletePerson,
  useGetData,
} from "service/customHooks";
import CustomerTable from "./components/customerTable";

const Customers = () => {
  const create = useCreatePerson({
    method: "post",
    url: "/customer",
  });

  const del = useDeletePerson({
    method: "delete",
    url: "/customer",
    headers: JSON.stringify({ accept: "*/*" }),
  });

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [privileges, setPrivileges] = useState(false);
  console.log(privileges);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h2">Add Customer</Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            flexWrap: "wrap",
            width: "40%",
          }}
        >
          <TextField
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            style={{ width: 250 }}
          />
          <TextField
            onChange={(e) => setGender(e.target.value)}
            placeholder="gender"
            style={{ width: 250 }}
          />
          <TextField
            onChange={(e) => setAge(e.target.value)}
            placeholder="age"
            style={{ width: 250 }}
          />
          <TextField
            onChange={(e) => setRoomNumber(e.target.value)}
            placeholder="room number"
            style={{ width: 250 }}
          />
        </div>

        <FormControlLabel
          checked={privileges}
          onChange={() => {
            setPrivileges(!privileges);
          }}
          control={<Checkbox defaultChecked />}
          label="privileges"
        />

        <Button
          onClick={() =>
            create.mutate({
              body: JSON.stringify({
                name: name,
                gender: gender,
                age: age,
                roomNumber: roomNumber,
                privileges: privileges,
              }),
            })
          }
          variant="contained"
        >
          create
        </Button>

        <CustomerTable />
      </div>
    </div>
  );
};

export default Customers;
