import React from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";
import api from "@/lib/api";
import { User } from "@/types";

type IAuthMiddleware = {
  children: React.ReactElement;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const [cookies] = useCookies(["logged_in"]);
  const setUser = useAuthStore((state) => state.setUser);

  const { isLoading } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => api.get("/users/me"),
    onSuccess: (data) => {
      console.log("data success", data);
      setUser(data.data.data.user as User);
    },
    enabled: !!cookies.logged_in,
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  const { isInitialLoading: isLoading2 } = useQuery({
    queryKey: ["auth", "refresh"],
    queryFn: () => {
      return api.get("/auth/refresh");
    },
    onSuccess: (data) => {
      console.log("data refresh", data);
    },
    refetchInterval: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading || isLoading2) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthMiddleware;
