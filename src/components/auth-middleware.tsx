import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import useAuthStore from "@/store/authStore";
import { getLoggedInUser, refreshToken } from "@/lib/api";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const startingRequest = async () => {
  // await refreshToken();
  return await getLoggedInUser();
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const [cookies] = useCookies(["logged_in"]);
  const setUser = useAuthStore((state) => state.setUser);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);


  useEffect(() => {
    // if (cookies.logged_in) {
      setIsLoading(true);
      startingRequest()
        .then((user) => {
          console.log("user", user);
          setUser(user);
        })
        .finally(() => {
          setIsLoading(false);
        });
    // } else {
    //   setIsLoading(false);
    // }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthMiddleware;
