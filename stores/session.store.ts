import { SessionRepository } from "@/repositories/session.repository";
import { create } from "zustand";

export const useSessionStore = create((set) => ({
  currentSession: null,

  loadCurrentSession: async (userId: number) => {
    const session = await SessionRepository.getCurrent(userId);

    if (session) {
      set({ currentSession: session });
    }
  },

  setCurrentSession: (session: any) => {
    set({ currentSession: session });
  },

  clearSession: () => set({ currentSession: null }),
}));
