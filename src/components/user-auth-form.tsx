import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect, useLocation } from "react-router-dom";
import { getGoogleUrl } from "@/lib/getGoogleUrl";
import api from "@/lib/api";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  login: boolean;
}

export function UserAuthForm({
  className,
  login,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");

  // const navigate = useNavigate();
  const location = useLocation();

  const from = ((location.state as any)?.from?.pathname as string) || "/";

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    if (login) {
      const res = await api.post("/auth/login", {
        email,
        password,
      });
      console.log("res", res);
      redirect(from)
    } else {
      const data = await api.post("/auth/register", {
        name,
        passwordConfirm: confirmPassword,
        email,
        password,
      });
      console.log("data", data);
    }
    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          { !login && <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Full Name"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>}
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="pass">
              Password
            </Label>
            <Input
              id="pass"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!login && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="conf-pass">
                Confirm Password
              </Label>
              <Input
                id="conf-pass"
                placeholder="Confirm Password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isLoading}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {login ? "Login" : "Sign Up"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-row gap-3 ">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{" "}
          Github
        </Button>
        <Button
          asChild
          variant="outline"
          type="button"
          disabled={isLoading}
          className="flex-1"
        >
          <a href={getGoogleUrl(from)}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
            Google
          </a>
        </Button>
      </div>
    </div>
  );
}
