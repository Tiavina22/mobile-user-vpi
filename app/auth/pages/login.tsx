import React, { useState } from 'react';
import { StyleSheet, Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true); 

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
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
          <Icon name={secureTextEntry ? 'visibility-off' : 'visibility'} size={24} color="#023047" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Vous n'avez pas de compte ? Inscrivez-vous ici.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#023047',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "white",
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'left', 
    width: '100%', 
  },
  input: {
    height: 50,
    width: '100%',
    maxWidth: 400,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#ffffff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginBottom: 16,
    position: 'relative', 
  },
  passwordInput: {
    height: 50,
    flex: 1,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingRight: 40, 
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 12,
    width: '100%',
    maxWidth: 400,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#888888',
  },
});

export default LoginScreen;
