import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '@/constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../constants/type';
import { useFocusEffect } from '@react-navigation/native';
type UserListNavigationProp = StackNavigationProp<RootStackParamList, 'UserList'>;

interface User {
    id: number;
    nom: string;
    email: string;
}


const UserList = () => {
    const navigation = useNavigation<UserListNavigationProp>();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const API_URL = `${BASE_URL}`;

    const fetchUsers = async () => {
        setLoading(true);
        setRefreshing(true); 
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token non trouvé');
            }
            const response = await axios.get<User[]>(`${API_URL}/managers`, {
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
            setRefreshing(false); 
        }
    };

      useFocusEffect(
        React.useCallback(() => {
            fetchUsers();
        }, [])
    );

    const handleUpdateUser = (user: User) => {
        navigation.navigate('pages/updateUser', { user });
    };

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
            Alert.alert("Succès", "Utilisateur supprimé avec succès");
            fetchUsers();
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de la suppression de l’utilisateur. id : ' + id);
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
            await axios.put(`${API_URL}/disable/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            Alert.alert("Succès", "Utilisateur désactivé avec succès");
            fetchUsers();
        } catch (error) {
            Alert.alert('Erreur', 'Erreur lors de la désactivation de l’utilisateur.');
            console.error('Erreur lors de la désactivation de l’utilisateur:', error);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true); 
        fetchUsers(); 
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
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
                        <View style={styles.userInfo}>
                            <Text style={styles.userText}>ID: {item.id}</Text>
                            <Text style={styles.userText}>Email: {item.email}</Text>
                            <Text style={styles.userText}>Nom: {item.nom}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => handleUpdateUser(item)}>
                                <Ionicons name="create-outline" size={28} color="#00BFFF" />
                            </TouchableOpacity>
                            <Ionicons name="trash-outline" size={28} color="#ff5252" onPress={() => handleDeleteUser(item.id)} />
                            <Ionicons name="ban-outline" size={28} color="#0B4163" onPress={() => handleDisableUser(item.id)} />
                        </View>
                    </View>
                )}
                
                refreshing={refreshing} 
                onRefresh={handleRefresh} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    userContainer: {
        marginBottom: 15,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1e1e1e', 
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    userInfo: {
        flex: 1,
        marginRight: 10,
    },
    userText: {
        fontSize: 16,
        marginBottom: 5,
        color: "#ffffff", 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default UserList;
