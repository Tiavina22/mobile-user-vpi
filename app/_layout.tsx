import React from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import Main from './index';
import RegisterScreen from "./pages/register";
import LoginScreen from "./pages/login";
import HomeScreen from "./pages/home";
import UpdateUser from './pages/updateUser';
import { RootStackParamList } from '../constants/type';
import { styles } from "./styles/home.styles";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#000" />
            <Stack.Navigator initialRouteName="index">
                <Stack.Screen 
                    name="index" 
                    component={Main} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="pages/register" 
                    component={RegisterScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="pages/login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="pages/home" 
                    component={HomeScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen
                    name="pages/updateUser"
                    component={UpdateUser}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </View>
    );
}