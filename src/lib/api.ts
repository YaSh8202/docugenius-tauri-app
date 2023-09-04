import { User } from "@/types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;

export const getLoggedInUser = async () => {
  const res = await api.get("/users/me");

  // if (res.status != 200) return null;
  console.log("res", res);

  return res.data.data.user as User;
};

export const refreshToken = async () => {
  const res = await api.get("/auth/refresh");

  if (res.status != 200) return null;

  return res.data.user as User;
};

export const createNewDoc = async ({
  title,
  url,
}: {
  title: string;
  url: string;
}) => {
  try {
    const res = await api.post("/docs", {
      title,
      url,
    });

    if (res.status != 201) return null;

    return res.data.data.doc;
  } catch (e) {
    console.log("error", e);
  }
};
