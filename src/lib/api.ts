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

  if (res.status != 200) return null;

  return res.data.user as User
};