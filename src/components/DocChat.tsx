import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DogIcon, Send, UserIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Doc, Message } from "@/types";
import api from "@/lib/api";
import { Icons } from "./icons";
import useMessageStore from "@/store/messageStore";
import ReactMarkdown from "react-markdown";
import useChatScroll from "@/hooks/useChatScroll";

const MessageComponent = ({
  message,
  isUser,
}: {
  message: string;
  isUser: boolean;
}) => {
  return (
    <div
      className={`border-b border-border flex w-full ${
        isUser ? "" : "bg-secondary/70"
      } `}
    >
      <div className="flex items-start mx-auto w-full max-w-2xl py-6 gap-4">
        <div className="mt-2.5" >
          {isUser ? (
            <UserIcon className="h-4 w-4 mr-1" />
          ) : (
            <DogIcon className="h-4 w-4 mr-1" />
          )}
        </div>
        <ReactMarkdown className="flex-1 overflow-scroll scrollbar-hide text-sm prose dark:prose-light 2xl:prose-lg ">
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const DocChat = ({ doc }: { doc: Doc }) => {
  const [message, setMessage] = React.useState("");

  const messages = useMessageStore((state) => state.docs[doc.id]);
  const addMessage = useMessageStore((state) => state.addMessage);
  const chatRef = useChatScroll(messages);

  const { mutate: sendQuesMutate, isLoading } = useMutation(
    async (ques: string) => {
      const res = await api.post(`/docs/${doc.id}/query`, { query: ques });
      return res.data?.data.queryResult;
    },
    {
      onSuccess: (data) => {
        setMessage("");
        console.log("data", data);
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
    sendQuesMutate(message);
  };
  console.log("messages", messages)
  return (
    <div className="w-full h-full bg-background flex flex-col ">
      <div ref={chatRef} className="flex-1 overflow-auto scrollbar-hide ">
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


/*
To start a Svelte project, you can follow these steps:

1. Install Svelte globally by running the following command:
```
npm install -g degit
```

2. Create a new Svelte project using the Svelte template:
```
npx degit sveltejs/template my-svelte-project
```

3. Change to the project directory:
```
cd my-svelte-project
```

4. Install the project dependencies:
```
npm install
```

5. Start the development server:
```
npm run dev
```

Now you have a basic Svelte project up and running!

To use Tailwind CSS with Svelte, follow these additional steps:

1. Install Tailwind CSS and its dependencies:
```
npm install tailwindcss postcss autoprefixer
```

2. Create a `tailwind.config.js` file in the project root:
```javascript
module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
```

3. Create a `postcss.config.js` file in the project root:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

4. Import Tailwind CSS in your `App.svelte` file:
```html
<script>
  import 'tailwindcss/tailwind.css';
</script>
```

Now you can use Tailwind CSS classes in your Svelte components!

Please note that these instructions assume you have Node.js and npm installed on your system.

*/