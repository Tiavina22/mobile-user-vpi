import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="#6200ee" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} /> {/* Écran de connexion */}
        <Stack.Screen name="home/pages/home" options={{ headerShown: false }} /> {/* Écran d'accueil */}
      </Stack>
    </>
  );
}