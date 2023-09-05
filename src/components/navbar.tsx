import { ModeToggle } from "./mode-toggle";
import { UploadDocModal } from "./upload-doc-modal";
import useAuthStore from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";

function Navbar() {

  const user = useAuthStore((state) => state.user);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4  mx-auto">
        <Link to='/' className="text-2xl font-bold">DocuGenius</Link>
        <div className="ml-auto flex items-center space-x-4">
          {/* <Link to='/' className='text-lg'>
            Documents
          </Link> */}

          <UploadDocModal />
          
          <ModeToggle />
          <Avatar >
            <AvatarImage src={user?.photo} alt="@shadcn" />
            <AvatarFallback>
              {
                user?.name.toUpperCase()[0]+`${user?.name.split(" ")[1] ? user?.name.split(" ")[1].toUpperCase()[0] : ""}`
              }
              </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
