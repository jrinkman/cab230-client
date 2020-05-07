import React from 'react';

const useDarkMode = () => {
  // Attempt to retrieve a previously set theme in the local storage
  const storeTheme = localStorage.getItem('theme');

  // Create a theme state
  const [theme, setTheme] = React.useState(storeTheme || 'light');

  // Create a function to toggle dark mode
  const toggleDarkMode = () => {
    // Generate the new theme string
    const newTheme = theme === 'light' ? 'dark' : 'light';

    // Update both the theme state and local storage
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Return the theme and the ability to toggle dark mode
  return [theme, toggleDarkMode];
};

export default useDarkMode;
