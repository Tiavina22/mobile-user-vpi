import React from "react";
import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from '../styles/home.styles';
import UserList from "../components/listUser";
import { Header } from "@/app/components/header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

function Home() {
    
  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity style={styles.buttonAddResponsable}>
        <Text style={styles.buttonAddResponsableText}>Ajouter un responsable</Text>
      </TouchableOpacity>
      <UserList />
    </View>
  );
}
function Profile() {
    const logout = async () => {
        try {
          await AsyncStorage.removeItem('token');
          Alert.alert('Déconnexion éffectuée !');
        } catch (error) {
          Alert.alert('Erreur', 'Impossible de se déconnecter.');
          console.error(error);
        }
        router.push('/pages/login');
      };
  return (
    <View style={styles.container}>
         <TouchableOpacity style={styles.buttonAddResponsable}>
        <Text onPress={logout} style={styles.buttonAddResponsableText}>Se déconnecter</Text>
      </TouchableOpacity> 
    </View>
  );
}
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
      <Tab.Navigator
      
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "All") {
              iconName = focused ? "list" : "list-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

           
            return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#0B4163",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
             height: 60,
             paddingBottom: 10,
             backgroundColor: '#000',
          }
        })}
      >
        <Tab.Screen name="All" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
  );
}
