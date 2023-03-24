import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuthContext } from "view-model/AuthContext";
import { useUiContext } from "view-model/uiContext";
import functionFactory from "./functionFactory";
type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

const baseUrl = "http://localhost:4000";

// export const useGetUser = () => {
//   const result = useQuery([], async (): Promise<void> => {
//     axios
//       .get("http://localhost:4000/user", {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       })
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log(err.response.data.message);
//       })
//       .finally(() => {
//         console.log("done");
//       });
//   });
//   return result;
// };
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

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ body }: { body: string }) => {
      return axios[method](baseUrl + url, JSON.parse(body))
        .then((res: { data: React.SetStateAction<null> }) => {
          setResponse(res.data);
        })
        .catch((err: React.SetStateAction<string>) => {
          console.log(err);
        })
        .finally(() => {
          console.log("done");
        });
    },
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries([]);
      console.log("post mutation", response);
    },
  });

  return mutation;
};

export const useLogin = () => {
  const UserAuth = useAuthContext();
  const Dialog = useUiContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ body }: { body: { email: string; password: string } }) => {
      return functionFactory.signIn({ body });
    },
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries([]);
      UserAuth.handleUserState("registered");
      Dialog.handleDialogState(false);
      console.log("delete mutation");
    },
  });

  return mutation;
};

export const useLogout = () => {
  const UserAuth = useAuthContext();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      return functionFactory.logOut();
    },
    onSuccess: (data, variable) => {
      queryClient.invalidateQueries([]);
      UserAuth.handleUserState("visitor");
      console.log("delete mutation");
    },
  });

  return mutation;
};

export const useDeletePerson = ({
  url,
  method,
  headers = "",
}: {
  url: string;
  method: Methods;
  headers: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id }: { id: string }) => {
      return axios[method](baseUrl + url + "/" + id, JSON.parse(headers));
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
