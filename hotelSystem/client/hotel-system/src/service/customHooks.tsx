import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

const baseUrl = "http://localhost:4000";

export const useGetData = ({
  url,
  method,
  headers = "",
}: {
  url: string;
  method: Methods;
  headers: string;
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  useQuery([], async (): Promise<void> => {
    axios[method](baseUrl + url, JSON.parse(headers))
      .then((res: { data: React.SetStateAction<null> }) => {
        setResponse(res.data);
      })
      .catch((err: React.SetStateAction<string>) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  });
  return { response, error, loading };
};

export const useCreatePerson = ({
  url,
  method,
}: {
  url: string;
  method: Methods;
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ body }: { body: string }) => {
      return axios[method](baseUrl + url, JSON.parse(body))
        .then((res: { data: React.SetStateAction<null> }) => {
          setResponse(res.data);
        })
        .catch((err: React.SetStateAction<string>) => {
          setError(err);
        })
        .finally(() => {
          setloading(false);
        });
    },
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries([]);
      console.log("post mutation", response, error, loading);
    },
  });

  return mutation;
};

export const useDeletePerson = ({
  url,
  method,
  headers = "",
  body = "",
}: {
  url: string;
  method: Methods;
  headers: string;
  body: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return axios[method](
        baseUrl + url + "/" + id,
        JSON.parse(headers),
        JSON.parse(body)
      );
    },
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries([]);
      console.log("delete mutation");
    },
  });

  return mutation;
};

// const useAxios = ({
//   url,
//   method,
//   headers = "",
//   body = "",
// }: {
//   url: string;
//   method: Methods;
//   headers: string;
//   body: string;
// }) => {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setloading] = useState(true);

//   const fetchData = () => {
//     axios[method](baseUrl + url, JSON.parse(headers), JSON.parse(body))
//       .then((res: { data: React.SetStateAction<null> }) => {
//         setResponse(res.data);
//       })
//       .catch((err: React.SetStateAction<string>) => {
//         setError(err);
//       })
//       .finally(() => {
//         setloading(false);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [method, url, headers]);

//   return { response, error, loading };
// };

// export default useAxios;
