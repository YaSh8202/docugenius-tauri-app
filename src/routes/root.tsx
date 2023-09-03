import Navbar from "@/components/navbar";
import useAuthStore from "@/store/authStore";
import { Outlet, redirect, useLoaderData } from "react-router-dom";

const Root = () => {
  const user = useAuthStore((state) => state.user);

  console.log("user", user);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
