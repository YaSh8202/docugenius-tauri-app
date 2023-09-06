export type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
  verfied: boolean;
  role: "user" | "admin";
};

export type Doc = {
  id: string;
  title: string;
  url: string;
};

export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};
