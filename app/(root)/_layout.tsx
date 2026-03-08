import { useAuthStore } from "@/stores/auth.store";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
const RootLayout = () => {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="customers/[id]" options={{ headerShown: true }} />
      <Stack.Screen
        name="customers/add-customer"
        options={{ headerShown: true }}
      />
      <Stack.Screen name="sessions/create" options={{ headerShown: true }} />
    </Stack>
  );
};

export default RootLayout;
