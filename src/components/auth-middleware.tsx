import React, { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { getLoggedInUser } from "@/lib/api";
import { Icons } from "./icons";
import logoDark from "@/assets/logo-dark.png";
import logoLight from "@/assets/logo-light.png";
import { useCookies } from "react-cookie";


type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [cookies] = useCookies(["logged_in"]);

  useEffect(() => {
    setIsLoading(true);
    getLoggedInUser()
      .then((user) => {
        console.log("user", user);
        setUser(user);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cookies]); 

  


  if (isLoading) {
    return (
      <div className="h-screen w-screen grid place-content-center ">
        <div className="flex flex-col items-center gap-5">
          <img src={logoDark} alt="" className="h-48 w-48 hidden dark:block" />
          <img src={logoLight} alt="" className="h-48 w-48 block dark:hidden" />

          <Icons.spinner className=" h-16 w-16 animate-spin" />
        </div>
      </div>
    );
  }

  return children;
};

export default AuthMiddleware;
