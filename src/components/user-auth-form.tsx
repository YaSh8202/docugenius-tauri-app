import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation } from "react-router-dom";
import { getGoogleUrl } from "@/lib/getGoogleUrl";
import { loginCall, registerCall } from "@/lib/api";
import { getGitHubUrl } from "@/lib/getGithubUrl";
import useAuthStore from "@/store/authStore";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

const registerSchema = loginSchema
  .extend({
    name: z.string().min(3).max(100),
    confirmPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type LoginFormInputs = z.infer<typeof loginSchema>;
type RegisterFormInputs = z.infer<typeof registerSchema>;

const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const { isLoading, error, mutateAsync } = useMutation(loginCall);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const token = await mutateAsync(data);
    console.log("token", token);

    setAccessToken(token);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
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
            {...register("email")}
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
            {...register("password")}
          />
        </div>
        {error! && (
          <div className="text-red-500 text-sm font-medium">
            {(error as Error).message as string}
          </div>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </div>
    </form>
  );
};

const RegisterForm = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });
  const {
    isLoading,
    error: registerError,
    mutateAsync,
  } = useMutation(registerCall);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const token = await mutateAsync({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.confirmPassword,
    });
    setAccessToken(token);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="grid gap-1">
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
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>
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
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
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
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>
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
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {registerError! && (
          <div className="text-red-500 text-sm font-medium">
            {(registerError as Error).message as string}
          </div>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign Up
        </Button>
      </div>
    </form>
  );
};

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  login: boolean;
}

export function UserAuthForm({
  className,
  login,
  ...props
}: UserAuthFormProps) {
  const [isLoading, ] = React.useState(false);
  // const navigate = useNavigate();
  const location = useLocation();

  const from = ((location.state as any)?.from?.pathname as string) || "/";

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {login ? <LoginForm /> : <RegisterForm />}

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
          <a className="flex items-center" href={getGitHubUrl(from)}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.gitHub className="mr-2 h-4 w-4" />
            )}{" "}
            Github
          </a>
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
