import React from 'react';

// Material UI imports
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Notifications provider
import { SnackbarProvider } from 'notistack';

// Material UI picker imports
import { LocalizationProvider } from '@material-ui/pickers';
import LuxonUtils from '@material-ui/pickers/adapter/luxon';

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
      <LocalizationProvider dateAdapter={LuxonUtils}>
        <AuthProvider>
          <ThemeProvider theme={currentTheme}>
            <SnackbarProvider
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              classes={{ variantSuccess: 'snackbar-white' }}
            >
              <CssBaseline />
              <Main theme={theme} toggleDarkMode={toggleDarkMode} />
            </SnackbarProvider>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
    </Router>
  );
}

export default App;
