import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import UploadPdf from '@/components/UploadPdf'
import { Button } from "./components/ui/button";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("Yash");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <h1 className="text-red-500" >Welcome to Tauri!</h1>

      <UploadPdf />
      <Button onClick={greet}>Say Hi!</Button>
    </div>
  );
}

export default App;
