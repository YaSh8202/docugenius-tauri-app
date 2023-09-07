import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { Icons } from "./icons";

export function AvatarDropdownMenu({ user }: { user: User }) {
  const { mutate: logoutMutate, isLoading } = useMutation(async () => {
    await api.get("/auth/logout");
  });

  const logoutHandler = () => {
    logoutMutate();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant={"outline"} className="p-0 cursor-pointer" asChild > */}
        <Avatar>
          <AvatarImage src={user?.photo} alt="user-avatar" />
          <AvatarFallback>
            {user?.name.toUpperCase()[0] +
              `${
                user?.name.split(" ")[1]
                  ? user?.name.split(" ")[1].toUpperCase()[0]
                  : ""
              }`}
          </AvatarFallback>
        </Avatar>
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer "
            disabled={isLoading}
            onClick={logoutHandler}
          >
            {isLoading && <Icons.spinner className="animate-spin h-3 w-3" />}Log
            out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
