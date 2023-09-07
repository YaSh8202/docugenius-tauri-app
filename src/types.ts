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
  size: number;
  created_at: string;
  updated_at: string;
};

export type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
};
