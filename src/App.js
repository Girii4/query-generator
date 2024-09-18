import React from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from './theme/GlobalStyle';
import { light } from './theme/theme';
import { SQLGenerator } from './pages/SQLGenerator';

function App() {
  return (
    <div>
      <ThemeProvider theme={light}>
        <GlobalStyle />
        <SQLGenerator />
      </ThemeProvider>
    </div>
  );
}

export default App;
