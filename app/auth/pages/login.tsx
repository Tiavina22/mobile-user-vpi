import React, { useState } from 'react';
import { Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useRouter } from 'expo-router';
import { styles } from '../styles/login';
import { login } from '../api/api.login';  

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const router = useRouter(); 

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    try {
      const data = await login(email, password);

      if (data.token) {
        console.log('Token JWT:', data.token);
        router.replace('../home/pages/home'); 
      }
    } catch (error: any) {
        console.log(error);
      if (error.message.includes('Utilisateur non trouvé')) {
        setEmailError(error.message); 
      } else if (error.message.includes('Mot de passe invalide')) {
        setPasswordError(error.message); 
      } else {
        setEmailError('Erreur inconnue, veuillez réessayer.'); 
      }
    }
  };

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo/logo.png')} style={{ width: 100, resizeMode: 'contain' }} />
      <Text style={styles.title}>Se connecter</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaaaaa"
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mot de passe"
          placeholderTextColor="#aaaaaa"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={secureTextEntry} 
        />
        <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.iconContainer}>
          <Icon name={secureTextEntry ? 'visibility-off' : 'visibility'} size={18} color="#000" />
        </TouchableOpacity>
      </View>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Vous n'avez pas de compte ? Inscrivez-vous ici.</Text>
    </View>
  );
};

export default LoginScreen;
