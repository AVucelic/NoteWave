import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const HomeScreen = () => {
  const { isDarkMode } = useTheme();
  const { selectedLanguage } = useLanguage();

  const getText = (key) => {
    switch (selectedLanguage) {
      case 'en':
        return englishText[key];
      case 'es':
        return spanishText[key];
      case 'hr':
        return croatianText[key];
      default:
        return englishText[key];
    }
  };

  const englishText = {
    appName: 'Welcome to NoteWave',
    description:
      'NoteWave is your ultimate music companion, allowing you to discover, listen, and enjoy your favorite tracks anywhere, anytime. Dive into a world of endless melodies and rhythm, and let NoteWave elevate your music experience!',
  };

  const spanishText = {
    appName: 'Bienvenido a NoteWave',
    description:
      'NoteWave es tu compañero musical definitivo, que te permite descubrir, escuchar y disfrutar tus canciones favoritas en cualquier lugar y en cualquier momento. Sumérgete en un mundo de melodías y ritmos infinitos, ¡y deja que NoteWave eleve tu experiencia musical!',
  };

  const croatianText = {
    appName: 'Dobrodošli u NoteWave',
    description:
      'NoteWave je vaš najbolji glazbeni suputnik koji vam omogućuje otkrivanje, slušanje i uživanje u svojim omiljenim pjesmama bilo gdje i bilo kada. Zaronite u svijet beskrajnih melodija i ritmova i pustite da NoteWave obogati vaše glazbeno iskustvo!',
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#24364d' : '#98c1d9' },
      ]}>
      <Text
        style={[styles.appName, { color: isDarkMode ? '#ffffff' : '#ffffff' }]}>
        {getText('appName')}
      </Text>
      <View
        style={[
          styles.descriptionContainer,
          { backgroundColor: isDarkMode ? '#3D5A80' : '#3D5A80' },
        ]}>
        <Text style={[styles.description, { color: '#ffffff' }]}>
          {getText('description')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionContainer: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
