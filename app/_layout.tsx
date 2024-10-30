import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
     <StatusBar  backgroundColor="#6200ee" />
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="index" />
    </Stack>
    </>
  );
}
