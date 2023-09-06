import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import useAuthStore from "@/store/authStore";
import { getLoggedInUser } from "@/lib/api";
import { Icons } from "./icons";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const [cookies] = useCookies(["logged_in"]);
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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
  }, [cookies.logged_in]);

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
