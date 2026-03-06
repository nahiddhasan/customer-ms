import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="customers/[id]" options={{ headerShown: true }} />
      <Stack.Screen
        name="customers/add-customer"
        options={{ headerShown: true }}
      />
    </Stack>
  );
};

export default RootLayout;
