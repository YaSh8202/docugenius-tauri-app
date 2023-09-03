export type User = {
  name: string;
  email: string;
  photo?: string;
  verfied: boolean;
  role: "user" | "admin";
};
