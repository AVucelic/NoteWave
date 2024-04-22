import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';

const ListenScreen = () => {
  const { isDarkMode } = useTheme();
  const { selectedLanguage } = useLanguage();

  const [artistName, setArtistName] = useState('');
  const [songName, setSongName] = useState('');
  const [songInfo, setSongInfo] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSongPreview = async (previewUrl) => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: previewUrl,
      });
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error('Error loading sound:', error);
      Alert.alert('Error', 'Failed to load song preview.');
    }
  };

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const fetchSongInfo = async () => {
    if (!artistName || !songName) {
      Alert.alert('Error', 'Please enter artist name and song name.');
      return;
    }

    try {
      const searchUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistName} ${songName}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            'd939f61ee4mshc19a59b2e775cefp17cec1jsnf4b92355cb42',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        },
      };

      const response = await fetch(searchUrl, options);
      const result = await response.json();

      if (result && result.data && result.data.length > 0) {
        const firstSong = result.data[0];
        const songPreviewUrl = firstSong.preview;
        setSongInfo(firstSong);
        playSongPreview(songPreviewUrl);
      } else {
        Alert.alert('Error', 'Song not found.');
      }
    } catch (error) {
      console.error('Error fetching song info:', error);
      Alert.alert('Error', 'Failed to fetch song info. Please try again.');
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
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
    title: 'Listen to a Song',
    artistName: 'Artist Name',
    songName: 'Song Name',
    fetchButton: 'Fetch Song Info',
    stopButton: 'Stop',
    startButton: 'Start',
  };

  const spanishText = {
    title: 'Escuchar una Canción',
    artistName: 'Nombre del Artista',
    songName: 'Nombre de la Canción',
    fetchButton: 'Obtener Información de la Canción',
    stopButton: 'Detener',
    startButton: 'Comenzar',
  };

  const croatianText = {
    title: 'Slušajte Pjesmu',
    artistName: 'Ime Izvođača',
    songName: 'Naziv Pjesme',
    fetchButton: 'Preuzmi Informacije o Pjesmi',
    stopButton: 'Zaustavi',
    startButton: 'Pokreni',
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
        {getText('title')}
      </Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder={getText('artistName')}
        value={artistName}
        onChangeText={setArtistName}
        placeholderTextColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder={getText('songName')}
        value={songName}
        onChangeText={setSongName}
        placeholderTextColor={isDarkMode ? '#FFFFFF' : '#FFFFFF'}
      />
      <Button
        title={getText('fetchButton')}
        onPress={fetchSongInfo}
        color="#3D5A80"
      />
      {songInfo && (
        <View>
          <Text style={isDarkMode ? styles.darkText : styles.text}>
            Title: {songInfo.title}
          </Text>
          <Text style={isDarkMode ? styles.darkText : styles.text}>
            Duration: {songInfo.duration} seconds
          </Text>
          <Button
            title={isPlaying ? getText('stopButton') : getText('startButton')}
            onPress={isPlaying ? stopPlayback : togglePlayback}
            color="#3D5A80"
          />
        </View>
      )}
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
    color: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  text: {
    color: '#FFFFFF',
  },
  darkText: {
    color: '#FFFFFF',
  },
});

export default ListenScreen;
