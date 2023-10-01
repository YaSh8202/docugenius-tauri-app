import { User } from "@/types";
import { create } from "zustand";



type State = {
  user: User | null;
};

type Actions = {
  setUser: (user: User | null) => void;
};

const useAuthStore = create<State & Actions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
