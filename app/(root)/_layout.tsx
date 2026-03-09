import { useAuthStore } from "@/stores/auth.store";
import { useSessionStore } from "@/stores/session.store";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

const RootLayout = () => {
  const loadCurrentSession = useSessionStore((s) => s.loadCurrentSession);
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const init = async () => {
      const user = await useAuthStore.getState().getUser();
      if (user) {
        await loadCurrentSession(user.id);
      }
    };

    init();
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
