import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const LoginScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const { selectedLanguage } = useLanguage();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert(getText('errorTitle'), getText('errorMessage'));
      return;
    }

    try {
      const isAuthenticated = await authenticateUser(username, password);

      if (isAuthenticated) {
        navigation.replace('MainApp', { username });
      } else {
        Alert.alert(
          getText('errorTitle'),
          getText('invalidCredentialsMessage')
        );
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
      Alert.alert(getText('errorTitle'), getText('loginErrorMessage'));
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const authenticateUser = async (username, password) => {
    const storedUsername = await AsyncStorage.getItem('username');
    const storedPassword = await AsyncStorage.getItem('password');

    const hashedPassword = CryptoJS.SHA256(password).toString();

    return storedUsername === username && hashedPassword === storedPassword;
  };

  const localizedText = {
    en: {
      title: 'Login',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      loginButton: 'Login',
      registerButton: 'Register',
      errorTitle: 'Error',
      errorMessage: 'Please enter username and password.',
      invalidCredentialsMessage: 'Invalid username or password.',
      loginErrorMessage: 'Failed to log in. Please try again.',
    },
    es: {
      title: 'Iniciar sesión',
      usernamePlaceholder: 'Nombre de usuario',
      passwordPlaceholder: 'Contraseña',
      loginButton: 'Iniciar sesión',
      registerButton: 'Registrarse',
      errorTitle: 'Error',
      errorMessage: 'Por favor ingrese nombre de usuario y contraseña.',
      invalidCredentialsMessage: 'Nombre de usuario o contraseña inválido.',
      loginErrorMessage:
        'No se pudo iniciar sesión. Por favor, inténtelo de nuevo.',
    },
    hr: {
      title: 'Prijava',
      usernamePlaceholder: 'Korisničko ime',
      passwordPlaceholder: 'Lozinka',
      loginButton: 'Prijava',
      registerButton: 'Registracija',
      errorTitle: 'Greška',
      errorMessage: 'Molimo unesite korisničko ime i lozinku.',
      invalidCredentialsMessage: 'Neispravno korisničko ime ili lozinka.',
      loginErrorMessage: 'Prijava nije uspjela. Molimo pokušajte ponovno.',
    },
  };

  const getText = (key) => {
    return localizedText[selectedLanguage][key] || localizedText['en'][key];
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
        {getText('title')}
      </Text>
      <Image source={require('../assets/Logo.png')} style={styles.logo} />
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder={getText('usernamePlaceholder')}
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={isDarkMode ? '#ffffff' : '#ffffff'}
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder={getText('passwordPlaceholder')}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={isDarkMode ? '#ffffff' : '#ffffff'}
      />
      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={handleLogin}>
        <Text style={styles.buttonText}>{getText('loginButton')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.registerButton, isDarkMode && styles.darkRegisterButton]}
        onPress={handleRegisterPress}>
        <Text style={styles.buttonText}>{getText('registerButton')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#98c1d9',
  },
  darkContainer: {
    backgroundColor: '#24364d',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  darkTitle: {
    color: '#ffffff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#ffffff',
  },
  darkInput: {
    color: '#ffffff',
    borderColor: '#FFFFFF',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3D5A80',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  darkButton: {
    backgroundColor: '#98c1d9',
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#24364d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  darkRegisterButton: {
    backgroundColor: '#3D5A80',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
