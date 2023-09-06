import Navbar from "@/components/navbar";
import useAuthStore from "@/store/authStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// export const rootLoader = () => {
//   const user = useAuthStore.getState().user;

//   if (!user) {
//     return redirect("/login");
//   }
//   return user;
// };

const Root = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);


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
