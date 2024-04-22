import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const ValidationScreen = () => {
  const { isDarkMode } = useTheme();
  const { selectedLanguage } = useLanguage();

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [duration, setDuration] = useState('');

  const localizedText = {
    en: {
      title: 'Add New Song',
      titleLabel: 'Title',
      artistLabel: 'Artist',
      durationLabel: 'Duration (seconds)',
      saveButton: 'Save',
      error: 'Error',
      missingFields: 'Please fill in all fields.',
      success: 'Success',
      saveSuccess: 'Song details saved!',
    },
    es: {
      title: 'Agregar Nueva Canción',
      titleLabel: 'Título',
      artistLabel: 'Artista',
      durationLabel: 'Duración (segundos)',
      saveButton: 'Guardar',
      error: 'Error',
      missingFields: 'Por favor complete todos los campos.',
      success: 'Éxito',
      saveSuccess: 'Detalles de la canción guardados.',
    },
    hr: {
      title: 'Dodaj Novu Pjesmu',
      titleLabel: 'Naslov',
      artistLabel: 'Izvođač',
      durationLabel: 'Trajanje (sekunde)',
      saveButton: 'Spremi',
      error: 'Greška',
      missingFields: 'Molimo ispunite sva polja.',
      success: 'Uspjeh',
      saveSuccess: 'Detalji pjesme su spremljeni!',
    },
  };

  const getText = (key) => {
    return localizedText[selectedLanguage][key] || localizedText['en'][key];
  };

  const handleSave = () => {
    if (!title || !artist || !duration) {
      Alert.alert(getText('error'), getText('missingFields'));
      return;
    }

    console.log('Saving...');
    console.log('Title:', title);
    console.log('Artist:', artist);
    console.log('Duration:', duration);

    setTitle('');
    setArtist('');
    setDuration('');

    Alert.alert(getText('success'), getText('saveSuccess'));
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
        {getText('title')}
      </Text>
      <TextInput
        style={[
          styles.input,
          isDarkMode && styles.darkInput,
          { color: isDarkMode ? '#ffffff' : '#ffffff' },
        ]}
        placeholder={getText('titleLabel')}
        placeholderTextColor={isDarkMode ? '#ffffff' : '#ffffff'}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={[
          styles.input,
          isDarkMode && styles.darkInput,
          { color: isDarkMode ? '#ffffff' : '#ffffff' },
        ]}
        placeholder={getText('artistLabel')}
        placeholderTextColor={isDarkMode ? '#ffffff' : '#ffffff'}
        value={artist}
        onChangeText={(text) => setArtist(text)}
      />
      <TextInput
        style={[
          styles.input,
          isDarkMode && styles.darkInput,
          { color: isDarkMode ? '#ffffff' : '#ffffff' },
        ]}
        placeholder={getText('durationLabel')}
        placeholderTextColor={isDarkMode ? '#ffffff' : '#ffffff'}
        value={duration}
        onChangeText={(text) => setDuration(text)}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={handleSave}>
        <Text style={styles.buttonText}>{getText('saveButton')}</Text>
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
    color: '#ffffff',
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
    backgroundColor: '#3D5A80',
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

export default ValidationScreen;
