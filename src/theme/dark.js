// Base theme
import base from './base';

/**
 * @typedef {import('@material-ui/core').ThemeOptions} ThemeOptions
 * @type {ThemeOptions}
 */
const dark = {
  ...base,
  palette: {
    type: 'dark',
  },
};

// Export the overrides
export default dark;
