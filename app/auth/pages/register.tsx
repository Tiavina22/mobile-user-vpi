import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

import { registerUser } from '../api/api.register';
import { router } from 'expo-router';



const RegisterScreen: React.FC = () => {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [motdepasse, setMotdepasse] = useState('');
    const [confirmation, setConfirmation] = useState('');

    const handleRegister = async () => {
        try {
            const response = await registerUser(nom, email, motdepasse, confirmation);
            Alert.alert('Succès', 'Inscription réussie !', [{ text: 'OK', onPress: () => router.push('./login') }]);
        } catch (error: unknown) { 
            if (error instanceof Error) {
                Alert.alert('Erreur', error.message, [{ text: 'OK' }]);
            } else {
                Alert.alert('Erreur', 'Une erreur est survenue.', [{ text: 'OK' }]);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Nom" value={nom} onChangeText={setNom} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <TextInput style={styles.input} placeholder="Mot de passe" value={motdepasse} onChangeText={setMotdepasse} secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirmer le mot de passe" value={confirmation} onChangeText={setConfirmation} secureTextEntry />
            <Button title="S'inscrire" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#000',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        color: "#000",
        backgroundColor: '#ffffff',
        paddingHorizontal: 10,
    },
});

export default RegisterScreen;
