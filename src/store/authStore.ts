import { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  user: User | null;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  logout: () => void;
};

type Actions = {
  setUser: (user: User | null) => void;
};

const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      user: null,
      accessToken: null,
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
