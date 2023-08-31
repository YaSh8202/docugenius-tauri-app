import Navbar from "@/components/navbar";
import { Outlet, redirect } from "react-router-dom";

const loggedIn = true;

export const rootLoader = ()=>{
  if(loggedIn){
    return {
      name: "test user",
      email: "user@test.com"
    }
  }else{
    return redirect("/login");
  }
}

const Root = () => {
  
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
