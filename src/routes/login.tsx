import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";
import loginImage from "@/assets/login-image2.jpg";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";

// const loggedIn = false;

// export const loader = () => {
//   const user = useAuthStore.getState().user;
//   console.log("user", user)
//   if (user) {
//     return redirect("/");
//   } else {
//     return {};
//   }
// };

export default function AuthenticationPage() {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="h-screen">
      <div className="container relative  h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button
          variant={"ghost"}
          className={"absolute right-4 top-4 md:right-8 md:top-8"}
          onClick={() => setShowLogin(!showLogin)}
        >
          {showLogin ? "Sign Up" : "Login"}
        </Button>
        <div
          className={
            "absolute block lg:hidden left-4 top-2 md:left-4 md:top-4"
          }
        >
          <img
            src="/src/assets/logo-dark.png"
            alt=""
            className="h-16 w-16 hidden dark:block"
          />
          <img
            src="/src/assets/logo-light.png"
            alt=""
            className="h-16 w-16 block dark:hidden"
          />
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div
            style={{
              backgroundImage: `url(${loginImage})`,
              backgroundBlendMode: "multiply",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="absolute inset-0 bg-zinc-900/80"
          >
            {/* <img
              src={loginImage}
              width={1280}
              height={843}
              alt="Authentication"
              className="hidden dark:block h-full  "
            /> */}
          </div>
          <div className="relative z-20 flex flex-col items-center text-lg font-medium justify-center h-[60vh] ">
            <img src="/src/assets/logo-dark.png" alt="" className="h-48 w-48" />
            <p className="text-4xl font-bold">DocuGenius</p>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Revolutionized the way I interact with documents! This
                app effortlessly extracts insights from files based on my
                prompts. A must-have for efficient information retrieval.&rdquo;
              </p>
              {/* <footer className="text-sm">Sofia Davis</footer> */}
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {showLogin ? "Sign In" : "Create an Account"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {showLogin
                  ? "Enter your email and password to sign in"
                  : "Enter your email and password to create an account"}
              </p>
            </div>
            <UserAuthForm login={showLogin} />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
