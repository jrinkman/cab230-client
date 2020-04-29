import React from 'react';

// Material UI imports
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// React router imports
import { BrowserRouter as Router } from 'react-router-dom';

// Theme imports
import lightTheme from './theme/light';
import darkTheme from './theme/dark';

// Main component (with switch)
import Main from './Main';

function App() {
  // Find out whether the user prefers dark mode by default
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)') || false;

  // Generate a base theme

  // Create a theme memo
  const theme = React.useMemo(
    () => createMuiTheme(prefersDarkMode ? darkTheme : lightTheme),
    [prefersDarkMode],
  );

  // Render out the application providers
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    </Router>
  );
}

export default App;
