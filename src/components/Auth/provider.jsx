import React from 'react';

// Import the context
import AuthContext from './context';

export default function AuthProvider(props) {
  // Create a variable to hold the initial auth state
  let initialState;

  // Try and grab an existing auth state
  const authStorage = localStorage.getItem('auth');

  // Check to see whether we're already logged in
  // and if the token is still valid
  if (authStorage && authStorage.loggedIn && authStorage.expires_at < Date.now()) {
    // If our last login is valid, update our auth to the local storage value
    initialState = authStorage;
  } else {
    // If not, create our initial state
    initialState = {
      loggedIn: false,
      token: null,
      token_type: null,
      expires: null,
    };

    // Also update local storage
    localStorage.setItem('auth', initialState);
  }

  // Initialize our auth state
  const [auth, setAuth] = React.useState(initialState);

  // Define our login function
  const login = () => {
  };

  // Define our logout function
  const logout = () => {

  };

  // Grab the children from the function props
  const { children } = props;

  // Return the auth provider
  return (
    <AuthContext.Provider value={{
      ...auth,
      login,
      logout,
    }}
    >
      {React.Children.toArray(children)}
    </AuthContext.Provider>
  );
}
