import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/user-auth-form";
import loginImage from "@/assets/login-image2.jpg";
import { useState } from "react";

export default function AuthenticationPage() {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  return (
    <div className="h-screen">
      <div className="md:hidden">
        <img
          src={loginImage}
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden h-full"
        />
        <img
          src={loginImage}
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block h-full "
        />
      </div>
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Button
          variant={"ghost"}
          className={"absolute right-4 top-4 md:right-8 md:top-8"}
          onClick={() => setShowLogin(!showLogin)}
        >
          {showLogin ? "Sign Up" : "Login"}
        </Button>
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
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            DocuGenius
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
