import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const ArtistSearchScreen = () => {
  const { isDarkMode } = useTheme();
  const { selectedLanguage } = useLanguage();

  const [artistName, setArtistName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (!artistName) {
      Alert.alert('Error', getText('errorEmptyArtistName'));
      return;
    }

    try {
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistName}`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key':
              'd939f61ee4mshc19a59b2e775cefp17cec1jsnf4b92355cb42',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
          },
        }
      );
      const data = await response.json();

      if (data && data.data && data.data.length > 0) {
        setSearchResults(data.data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', getText('errorSearchFailed'));
    }
  };

  const renderTrackItem = ({ item }) => {
    return (
      <View style={[styles.trackItem, isDarkMode && styles.darkTrackItem]}>
        <Image
          source={{ uri: item.album.cover_medium }}
          style={styles.albumCover}
        />
        <Text style={[styles.trackTitle, isDarkMode && styles.darkTrackTitle]}>
          {item.title}
        </Text>
      </View>
    );
  };

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
    placeholder: 'Enter artist name',
    buttonText: 'Search',
    errorEmptyArtistName: 'Please enter an artist name.',
    errorSearchFailed: 'Failed to search for artist. Please try again.',
  };

  const spanishText = {
    placeholder: 'Ingrese el nombre del artista',
    buttonText: 'Buscar',
    errorEmptyArtistName: 'Por favor ingrese el nombre de un artista.',
    errorSearchFailed:
      'Error al buscar el artista. Por favor intente nuevamente.',
  };

  const croatianText = {
    placeholder: 'Unesite ime umjetnika',
    buttonText: 'Pretraži',
    errorEmptyArtistName: 'Molimo unesite ime umjetnika.',
    errorSearchFailed:
      'Neuspješno pretraživanje umjetnika. Molimo pokušajte ponovno.',
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder={getText('placeholder')}
        value={artistName}
        onChangeText={(text) => setArtistName(text)}
        placeholderTextColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
      />
      <TouchableOpacity
        style={[styles.button, isDarkMode && styles.darkButton]}
        onPress={handleSearch}>
        <Text style={styles.buttonText}>{getText('buttonText')}</Text>
      </TouchableOpacity>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTrackItem}
        style={styles.trackList}
      />
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
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#FFFFFF',
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
  trackList: {
    width: '100%',
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#3D5A80',
    borderRadius: 8,
  },
  darkTrackItem: {
    backgroundColor: '#3D5A80',
  },
  albumCover: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 4,
  },
  trackTitle: {
    fontSize: 16,
    color: '#ffffff',
  },
  darkTrackTitle: {
    color: '#ffffff',
  },
});

export default ArtistSearchScreen;
