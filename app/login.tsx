import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { AuthService } from "../services/auth.service";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await AuthService.login(email, password);
      router.replace("/(root)/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Register" onPress={() => router.push("/register")} />
    </View>
  );
}
