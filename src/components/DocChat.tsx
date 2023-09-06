import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DogIcon, Send, UserIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Doc, Message } from "@/types";
import api from "@/lib/api";
import { Icons } from "./icons";
import useMessageStore from "@/store/messageStore";
import ReactMarkdown from 'react-markdown'


const MessageComponent = ({ message, isUser }: { message: string; isUser: boolean }) => {
  return (
    <div
      className={`border-b border-border flex w-full ${
        isUser ? "" : "bg-secondary/70"
      } `}
    >
      <div className="flex items-start mx-auto w-full max-w-2xl py-6 gap-4">
        <div>
          {isUser ? (
            <UserIcon className="h-4 w-4 mr-1" />
          ) : (
            <DogIcon className="h-4 w-4 mr-1" />
          )}
        </div>
        <ReactMarkdown className="flex-1 overflow-scroll scrollbar-hide ">{message}</ReactMarkdown>
      </div>
    </div>
  );
};

const DocChat = ({ doc }: { doc: Doc }) => {
  const [message, setMessage] = React.useState("");

  const messages = useMessageStore((state) => state.docs[doc.id]);
  const addMessage = useMessageStore((state) => state.addMessage);

  const { mutate: sendQuesMutate, isLoading } = useMutation(
    async (ques: string) => {
      const res = await api.post(`/docs/${doc.id}/query`, { query: ques });
      return res.data?.data.queryResult;
    },
    {
      onSuccess: (data) => {
        setMessage("");
        console.log("data", data);
        // setMessages((prev) => [...prev, data]);
        addMessage(doc.id, data);
      },
    }
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage(doc.id, {
      content: message,
      role: "user",
    } as Message);
    console.log(message);
    sendQuesMutate(message);
  };

  return (
    <div className="w-full h-full bg-background flex flex-col ">
      <div className="flex-1 overflow-auto scrollbar-hide ">
        {messages?.map((msg, idx) => (
          <MessageComponent
            key={idx}
            message={msg.content}
            isUser={msg.role === "user"}
          />
        ))}
      </div>
      <form
        onSubmit={submitHandler}
        className="h-[4.5rem] w-full border-t bg-background border-border px-6 flex items-center z-10"
      >
        <Input
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="Enter your Question"
          className="flex-1"
          disabled={isLoading}
        />
        <Button
          disabled={isLoading}
          type="submit"
          variant="ghost"
          className="ml-4"
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </Button>
      </form>
    </div>
  );
};

export default DocChat;
