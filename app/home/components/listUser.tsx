import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';
import { BASE_URL } from '@/constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

interface User {
    id: number;
    nom: string;
    email: string;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const API_URL = `${BASE_URL}/managers`;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await AsyncStorage.getItem('token'); 
                
                const response = await axios.get<User[]>(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                });
                setUsers(response.data);
            } catch (error) {
                Alert.alert('Erreur', 'Erreur lors de la récupération des utilisateurs.');
                console.error('Erreur lors de la récupération des utilisateurs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (id: number) => {
        const confirm = await new Promise((resolve) => {
            Alert.alert(
                'Confirmation',
                'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
                [
                    { text: 'Annuler', onPress: () => resolve(false), style: 'cancel' },
                    { text: 'OK', onPress: () => resolve(true) },
                ]
            );
        });

        if (!confirm) return;

        try {
            const token = await AsyncStorage.getItem('token'); 
            await axios.delete(`${API_URL}/manager/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(users.filter(user => user.id !== id));
            Alert.alert("Succès", "Utilisateur supprimé avec succès");
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de la suppression de l’utilisateur.');
            console.error('Erreur lors de la suppression de l’utilisateur:', error);
        }
    };

    const handleDisableUser = async (id: number) => {
        const confirm = await new Promise((resolve) => {
            Alert.alert(
                'Confirmation',
                'Êtes-vous sûr de vouloir désactiver cet utilisateur ?',
                [
                    { text: 'Annuler', onPress: () => resolve(false), style: 'cancel' },
                    { text: 'OK', onPress: () => resolve(true) },
                ]
            );
        });

        if (!confirm) return;

        try {
            const token = await AsyncStorage.getItem('token');
            await axios.patch(`${API_URL}/disable/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            Alert.alert("Succès", "Utilisateur désactivé avec succès");
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de la désactivation de l’utilisateur.');
            console.error('Erreur lors de la désactivation de l’utilisateur:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={users}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userContainer}>
                        <Text style={styles.userText}>{item.nom} ({item.email})</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Supprimer" onPress={() => handleDeleteUser(item.id)} />
                            <Button title="Désactiver" onPress={() => handleDisableUser(item.id)} />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userContainer: {
        marginBottom: 15,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    userText: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default UserList;
