import React from "react";
import useAuthStore from "@/store/authStore";
import { getLoggedInUser } from "@/lib/api";
import { Icons } from "./icons";
import { useQuery } from "@tanstack/react-query";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const accessToken = useAuthStore((state) => state.accessToken);

  const { isLoading } = useQuery(["user", accessToken], getLoggedInUser, {
    onSuccess: (data) => {
      setUser(data);
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen w-screen grid place-content-center ">
        <div className="flex flex-col items-center gap-5">
          <img
            src="/src/assets/logo-dark.png"
            alt=""
            className="h-48 w-48 hidden dark:block"
          />
          <img 
            src="/src/assets/logo-light.png"
            alt=""
            className="h-48 w-48 block dark:hidden"
          />

          <Icons.spinner className=" h-16 w-16 animate-spin" />
        </div>
      </div>
    );
  }

  return children;
};

export default AuthMiddleware;
