/**
 * @typedef {import('@material-ui/core').ThemeOptions} ThemeOptions
 * @type {ThemeOptions}
 */
const base = {
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 8,
      },
    },
  },
};

// Export the overrides
export default base;
