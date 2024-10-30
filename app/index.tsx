import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LoginScreen from "./auth/pages/login";

export default function Index(){
    return (
       <View style={styles.container}>
        <LoginScreen/>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      backgroundColor: '#fff',
    },
  })