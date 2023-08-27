import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "./mode-toggle";

function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <h1 className="text-2xl font-bold">PDF.ai</h1>
        <div className="ml-auto flex items-center space-x-4">
          <Button className="flex items-center">
            <PlusIcon className="h-4 w-4 mr-1" />
            Upload
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
