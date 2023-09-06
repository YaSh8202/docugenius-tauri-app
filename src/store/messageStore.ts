import { Message } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  docs: {
    [key: string]: Message[];
  };
};

type Actions = {
  addMessage: (docId: string, message: Message) => void;
};

const useMessageStore = create(
  persist<State & Actions>(
    (set) => ({
      docs: {},
      addMessage: (docId, message) => {
        set((state) => {
          const prevMessages = state.docs[docId] || [];
          return {
            docs: {
              ...state.docs,
              [docId]: [...prevMessages, message],
            },
          };
        });
      },
    }),
    {
      name: "message-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMessageStore;
