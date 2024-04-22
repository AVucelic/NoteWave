import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const { selectedLanguage } = useLanguage();

  const localizedText = {
    en: {
      title: 'Profile Screen',
      logout: 'Logout',
      settings: 'Settings',
    },
    es: {
      title: 'Pantalla de Perfil',
      logout: 'Cerrar Sesión',
      settings: 'Ajustes',
    },
    hr: {
      title: 'Profilna Stranica',
      logout: 'Odjava',
      settings: 'Postavke',
    },
  };

  const getText = (key) => {
    return localizedText[selectedLanguage][key] || localizedText['en'][key];
  };

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
        {getText('title')}
      </Text>
      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={handleLogout}>
        <Text style={styles.buttonText}>{getText('logout')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={handleSettingsPress}>
        <Text style={styles.buttonText}>{getText('settings')}</Text>
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
    color: '#FFFFFF',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3D5A80',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
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

export default ProfileScreen;
