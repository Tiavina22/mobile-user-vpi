import { Stack } from "expo-router";
import React from "react";
import { StatusBar, View, StyleSheet } from "react-native";


export default function RootLayout() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/pages/register" options={{ headerShown: false }} />
        <Stack.Screen name="home/pages/home" options={{ headerShown: false }} /> Écran d'accueil
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
