import { ModeToggle } from "./mode-toggle";
import { invoke } from "@tauri-apps/api/tauri";
import { UploadDocModal } from "./upload-doc-modal";


function Navbar() {

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    const data = await invoke("greet", { name: "Zoro" });
    console.log(data);
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <h1 className="text-2xl font-bold">DocuGenius</h1>
        <div className="ml-auto flex items-center space-x-4">
          <UploadDocModal />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
