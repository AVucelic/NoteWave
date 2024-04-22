import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const SettingsScreen = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { selectedLanguage, handleLanguageChange } = useLanguage();

  const [showModal, setShowModal] = useState(false);

  const languages = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'Croatian', value: 'hr' },
  ];

  const saveLanguageSetting = async (language) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
      handleLanguageChange(language);
      setShowModal(false);
    } catch (error) {
      console.log('Error saving language:', error);
    }
  };

  const localizedText = {
    en: {
      title: 'Settings',
      darkModeLabel: 'Dark Mode',
      languageLabel: 'Language',
      closeModal: 'Close',
    },
    es: {
      title: 'Ajustes',
      darkModeLabel: 'Modo Oscuro',
      languageLabel: 'Idioma',
      closeModal: 'Cerrar',
    },
    hr: {
      title: 'Postavke',
      darkModeLabel: 'Tamni Način',
      languageLabel: 'Jezik',
      closeModal: 'Zatvori',
    },
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
        {localizedText[selectedLanguage].title}
      </Text>
      <View style={styles.optionContainer}>
        <Text
          style={[styles.optionLabel, isDarkMode && styles.darkOptionLabel]}>
          {localizedText[selectedLanguage].darkModeLabel}
        </Text>
        <Switch
          trackColor={{ false: '#767577', true: '#A38963' }}
          thumbColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isDarkMode}
        />
      </View>
      <View style={styles.languageContainer}>
        <Text
          style={[styles.optionLabel, isDarkMode && styles.darkOptionLabel]}>
          {localizedText[selectedLanguage].languageLabel}
        </Text>
        <TouchableOpacity
          style={[
            styles.languageButton,
            isDarkMode && styles.darkLanguageButton,
          ]}
          onPress={() => setShowModal(true)}>
          <Text style={styles.languageButtonText}>{selectedLanguage}</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={languages}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => saveLanguageSetting(item.value)}>
                <Text style={styles.modalItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.value}
          />
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text style={styles.closeButtonText}>
              {localizedText[selectedLanguage].closeModal}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  optionLabel: {
    fontSize: 18,
    marginRight: 10,
    color: '#000000',
  },
  darkOptionLabel: {
    color: '#FFFFFF',
  },
  languageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  languageButton: {
    backgroundColor: '#3D5A80',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  darkLanguageButton: {
    backgroundColor: '#3D5A80',
  },
  languageButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width: '100%',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 18,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
    marginTop: 20,
  },
});

export default SettingsScreen;
