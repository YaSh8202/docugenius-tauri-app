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

  const { isLoading } = useQuery(
    ["user", accessToken],
    getLoggedInUser,
    {
      onSuccess: (data) => {
        setUser(data);
      },
    }
  );

  if (isLoading) {
    return (
      <div className="h-screen w-screen grid place-content-center">
        <Icons.spinner className=" h-16 w-16 animate-spin" />
      </div>
    );
  }

  return children;
};

export default AuthMiddleware;
