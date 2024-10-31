import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import LoginScreen from "./pages/login";
// import RegisterScreen from "./pages/auth/pages/register";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./pages/home";

export default function Index(){
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try{
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } 
      }   catch(error)  {
        console.error("Erreur lors de la récupération du token:", error);
      } finally {
          setIsLoading(false);
      }
  };

  checkToken();
}, []);

  if(isLoading){
    // Affichage d'un indicateur de chargement pendant la vérification du token
    return (
      <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
      </View>
  );
  }

  return isLoggedIn ? <Home /> : <LoginScreen />;


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: "flex",
      backgroundColor: '#fff',
    },
  })