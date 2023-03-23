import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useCreatePerson,
  useDeletePerson,
  useGetData,
} from "service/customHooks";

const Customers = () => {
  const { response, loading, error } = useGetData({
    method: "get",
    url: "/customer",
    headers: JSON.stringify({ accept: "*/*" }),
  });

  const create = useCreatePerson({
    method: "post",
    url: "/customer",
  });
  const del = useDeletePerson({
    method: "delete",
    url: "/customer",
    headers: JSON.stringify({ accept: "*/*" }),
    body: JSON.stringify({
      id: 1,
      name: "erkan",
      gender: "erkek",
      age: "25",
    }),
  });
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);
  console.log(error);

  return (
    <div className="App">
      <h1>customers</h1>

      <input onChange={(e) => setName(e.target.value)}></input>
      <input onChange={(e) => setGender(e.target.value)}></input>
      <input onChange={(e) => setAge(e.target.value)}></input>
      <button
        onClick={() =>
          create.mutate({
            body: JSON.stringify({
              name: name,
              gender: gender,
              age: age,
            }),
          })
        }
      >
        bas
      </button>

      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          {data.map(
            (
              value: { name: string; id: number; gender: string; age: string },
              index
            ) => {
              return (
                <div key={index}>
                  {value.id +
                    " " +
                    value.name +
                    " " +
                    value.gender +
                    " " +
                    value.age}{" "}
                  <button onClick={() => del.mutate({ id: value.id })}>
                    sil
                  </button>
                  <Link
                    to={`/view-contact-details/${value.id}`}
                    state={{ name: value.name }}
                  >
                    <button>view</button>
                  </Link>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default Customers;
