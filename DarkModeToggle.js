import React from 'react';
import { View, Button } from 'react-native';
import { useTheme } from '../ThemeContext';

const DarkModeToggle = () => {
  const { toggleDarkMode } = useTheme();

  return (
    <View>
      <Button title="Toggle Dark Mode" onPress={toggleDarkMode} />
    </View>
  );
};

export default DarkModeToggle;
