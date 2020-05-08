// Material UI color imports
import blueGrey from '@material-ui/core/colors/blueGrey';

// Base theme
import base from './base';

/**
 * @typedef {import('@material-ui/core').ThemeOptions} ThemeOptions
 * @type {ThemeOptions}
 */
const light = {
  ...base,
  palette: {
    type: 'light',
    text: {
      primary: blueGrey[800],
    },
    secondary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700],
    },
  },
};

// Export the overrides
export default light;
