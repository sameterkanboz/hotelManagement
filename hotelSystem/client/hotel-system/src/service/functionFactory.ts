import axios from "axios";
import React from "react";




export class FunctionFactory {
 

 logOut = async () => {
    await fetch("http://localhost:4000/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
  }


  signIn = async ({body}:{body:{email:string,password:string}}) => {
    
    try {
        axios.post("http://localhost:4000/login" ,   body,{withCredentials:true} )
        .then((res: { data: React.SetStateAction<null> }) => {
          console.log(res.data)
        
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
        .finally(() => {
          console.log("done");
        });

      return 
    } catch (error) {
    console.log(error)
    }
  };

  signUp  = async ({body}:{body:{name:string,email:string,password:string}}) => {

    try {
        axios.post("http://localhost:4000/register" , body)
        .then((res: { data: React.SetStateAction<null> }) => {
          console.log(res.data)
        })
        .catch((err: React.SetStateAction<string>) => {
          console.log(err);
        })
        .finally(() => {
          console.log("done");
        });

      return 
    } catch (error) {
    console.log(error)
    }
  };




  passCheck = (
    password: string,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const passwordControl = new RegExp(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
    );
    if (passwordControl.test(password)) {
      setter(true);
    } else {
      setter(false);
    }
  };

  mailCheck = (
    email: string,
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const mailControl = new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);
    if (mailControl.test(email)) {
      setter(true);
    } else {
      setter(false);
    }
  };
}

const functionFactory = new FunctionFactory();
export default functionFactory;