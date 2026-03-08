import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,

  setUser: async (user) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  loadUser: async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("user");
    set({ user: null });
  },
}));
