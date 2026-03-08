import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { UserRepository } from "../repositories/user.repository";

export const AuthService = {
  async register(name: string, email: string, password: string) {
    const existing = await UserRepository.findByEmail(email);
    if (existing) throw new Error("User already exists");

    await UserRepository.create({ name, email, password });
  },

  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password,
    );

    if (hashed !== user.password) throw new Error("Invalid password");

    await AsyncStorage.setItem("user", JSON.stringify(user));

    return user;
  },

  async getCurrentUser() {
    const user = await AsyncStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};
