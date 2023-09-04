import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DogIcon, Send, UserIcon } from "lucide-react";

const Message = ({ message, isUser }: { message: string; isUser: boolean }) => {
  return (
    <div className={`border-b border-border flex w-full ${isUser? '':'bg-secondary/70'} `}>
      <div className="flex items-center mx-auto w-full max-w-xl py-6 gap-4">
        <div>{isUser ? 
          <UserIcon className="h-4 w-4 mr-1" />
        : 
          <DogIcon className="h-4 w-4 mr-1" />
        }</div>
        <div className="flex-1">{message}</div>
      </div>
    </div>
  );
};

const DocChat = () => {
  return (
    <div className="w-full h-full bg-background flex flex-col ">
      <div className="flex-1 overflow-auto scrollbar-hide ">
        <Message message="Hello" isUser={true} />
        <Message message="Hello" isUser={false} />
        <Message message="Hello" isUser={true} />
        <Message message="Hello" isUser={false} />
        <Message message="Hello" isUser={true} />
        <Message message="Hello" isUser={false} />
        <Message message="Hello" isUser={true} />
        <Message message="Hello" isUser={false} />
        <Message message="Hello" isUser={true} />
        <Message message="Hello" isUser={false} />
      </div>
      <div className="h-[4.5rem] w-full border-t bg-background border-border px-6 flex items-center z-10">
        <Input placeholder="Enter your Question" className="flex-1" />
        <Button variant="ghost" className="ml-4">
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
};

export default DocChat;
