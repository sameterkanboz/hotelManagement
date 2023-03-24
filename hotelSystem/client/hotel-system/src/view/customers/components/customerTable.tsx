import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDeletePerson, useGetData } from "service/customHooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Checkbox, Typography } from "@mui/material";

function createData(
  id: string,
  name: string,
  gender: string,
  age: string,
  roomNumber: string,
  privileges: boolean
) {
  return { id, name, gender, age, roomNumber, privileges };
}

export default function CustomerTable() {
  const { response, loading, error } = useGetData({
    method: "get",
    url: "/customer",
    headers: JSON.stringify({ accept: "*/*" }),
  });

  const del = useDeletePerson({
    method: "delete",
    url: "/customer",
    headers: JSON.stringify({ accept: "*/*" }),
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);
  console.log(error);

  const rows = data.map(
    (value: {
      name: string;
      id: string;
      gender: string;
      age: string;
      roomNumber: string;
      privileges: boolean;
    }) => {
      return createData(
        value.id,
        value.name,
        value.gender,
        value.age,
        value.roomNumber,
        value.privileges
      );
    }
  );

  return (
    <TableContainer sx={{ width: "70%" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>name</TableCell>
            <TableCell align="right">gender</TableCell>
            <TableCell align="right">age</TableCell>
            <TableCell align="right">roomNumber</TableCell>
            <TableCell align="right">privileges</TableCell>
          </TableRow>
        </TableHead>

        {loading ? (
          <p>loading...</p>
        ) : (
          <TableBody>
            {rows.map(
              (row: {
                id: string;
                name: string;
                gender: string;
                age: string;
                roomNumber: string;
                privileges: boolean;
              }) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography style={{ flex: 1 }}>{row?.name}</Typography>

                      <div>
                        <ButtonGroup style={{ gap: 10 }}>
                          <Button
                            variant="outlined"
                            onClick={() => del.mutate({ id: row?.id })}
                          >
                            sil
                          </Button>
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/view-contact-details/${row?.id}`}
                            state={{ name: row?.name }}
                          >
                            <Button variant="outlined">view</Button>
                          </Link>
                        </ButtonGroup>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="right">{row?.gender}</TableCell>
                  <TableCell align="right">{row?.age}</TableCell>
                  <TableCell align="right">{row?.roomNumber}</TableCell>
                  <TableCell align="right">
                    <Checkbox checked={row?.privileges} />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
