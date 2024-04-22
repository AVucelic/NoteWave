import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '../ThemeContext';
import { useLanguage } from '../LanguageContext';
import HomeScreen from './HomeScreen';
import ValidationScreen from './ValidationScreen';
import ArtistSearchScreen from './ArtistSearchScreen';
import ListenScreen from './ListenScreen';
import ProfileStackNavigator from './ProfileStackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const MainBottomTabNavigator = () => {
  const { isDarkMode } = useTheme();
  const { selectedLanguage } = useLanguage();

  const localizedText = {
    en: {
      home: 'Home',
      add: 'Add',
      search: 'Search',
      listen: 'Listen',
      profile: 'Profile',
    },
    es: {
      home: 'Inicio',
      add: 'Agregar',
      search: 'Buscar',
      listen: 'Escuchar',
      profile: 'Perfil',
    },
    hr: {
      home: 'Početna',
      add: 'Dodaj',
      search: 'Pretraga',
      listen: 'Slušaj',
      profile: 'Profil',
    },
  };

  const getTabLabel = (routeName) => {
    return (
      localizedText[selectedLanguage][routeName] ||
      localizedText['en'][routeName]
    );
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: isDarkMode ? '#3D5A80' : '#3D5A80',
        inactiveTintColor: isDarkMode ? '#98c1d9' : '#98c1d9',
        style: {
          backgroundColor: isDarkMode ? '#24364d' : '#98c1d9',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: getTabLabel('home'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={ValidationScreen}
        options={{
          tabBarLabel: getTabLabel('add'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={ArtistSearchScreen}
        options={{
          tabBarLabel: getTabLabel('search'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Listen"
        component={ListenScreen}
        options={{
          tabBarLabel: getTabLabel('listen'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="headphones" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: getTabLabel('profile'),
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
