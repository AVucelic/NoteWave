import React from 'react';
import { LanguageProvider } from './LanguageContext';
import AppContainer from './AppContainer';

const App = () => {
  return (
    <LanguageProvider>
      <AppContainer />
    </LanguageProvider>
  );
};

export default App;
