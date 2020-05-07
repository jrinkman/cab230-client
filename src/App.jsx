import React from 'react';

// Material UI imports
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// React router imports
import { BrowserRouter as Router } from 'react-router-dom';

// Authentication provider
import AuthProvider from './auth/provider';

// Main component (with switch)
import Main from './Main';

// Theme imports
import lightTheme from './theme/light';
import darkTheme from './theme/dark';
import useDarkMode from './theme/useDarkMode';

function App() {
  // Listen to the useDarkMode hook
  const [theme, toggleDarkMode] = useDarkMode();

  // Create a theme memo
  const currentTheme = React.useMemo(
    () => createMuiTheme(theme === 'dark' ? darkTheme : lightTheme),
    [theme],
  );

  // Render out the application providers
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={currentTheme}>
          <CssBaseline />
          <Main theme={theme} toggleDarkMode={toggleDarkMode} />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
