import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from '../styles/home';
import UserList from "../components/listUser";
import { Header } from "@/app/components/header";

export default function Home(){
    return (
        <View style={styles.container}>
            <Header />
            <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>Ajouter un responsable</Text>
      </TouchableOpacity>
      <UserList />
        </View>
    )
}