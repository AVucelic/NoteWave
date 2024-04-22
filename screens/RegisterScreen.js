import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const RegisterScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const { selectedLanguage } = useLanguage();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const localizedText = {
    en: {
      title: 'Register',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      registerButton: 'Register',
      error: 'Error',
      missingFields: 'Please enter username and password.',
      success: 'Success',
      registrationSuccess: 'Registration successful. Please log in.',
      registrationFailed: 'Failed to register. Please try again.',
    },
    es: {
      title: 'Registro',
      usernamePlaceholder: 'Nombre de usuario',
      passwordPlaceholder: 'Contraseña',
      registerButton: 'Registrar',
      error: 'Error',
      missingFields: 'Por favor, ingrese nombre de usuario y contraseña.',
      success: 'Éxito',
      registrationSuccess: 'Registro exitoso. Por favor, inicie sesión.',
      registrationFailed: 'Error al registrar. Inténtelo de nuevo.',
    },
    hr: {
      title: 'Registracija',
      usernamePlaceholder: 'Korisničko ime',
      passwordPlaceholder: 'Lozinka',
      registerButton: 'Registriraj',
      error: 'Greška',
      missingFields: 'Molimo unesite korisničko ime i lozinku.',
      success: 'Uspjeh',
      registrationSuccess: 'Registracija uspješna. Molimo prijavite se.',
      registrationFailed: 'Registracija nije uspjela. Molimo pokušajte ponovo.',
    },
  };

  const getText = (key) => {
    return localizedText[selectedLanguage][key] || localizedText['en'][key];
  };

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert(getText('error'), getText('missingFields'));
      return;
    }

    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();

      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', hashedPassword);

      Alert.alert(getText('success'), getText('registrationSuccess'));
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error saving user data:', error);
      Alert.alert(getText('error'), getText('registrationFailed'));
    }
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
        {getText('title')}
      </Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder={getText('usernamePlaceholder')}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder={getText('passwordPlaceholder')}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={handleRegister}>
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
    color: '#FFFFFF',
  },
  darkTitle: {
    color: '#ffffff',
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
    borderColor: '#ffffff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#24364d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  darkButton: {
    backgroundColor: '#3D5A80',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
