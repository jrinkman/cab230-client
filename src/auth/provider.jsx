import React from 'react';

// Import the context
import AuthContext from './context';

// API class
import API from './api';

export default function AuthProvider(props) {
  // Create a variable to hold the initial auth state
  let initialState;

  // Try and grab an existing auth state
  const authStorage = localStorage.getItem('auth');

  // Check to see whether we're already logged in
  // and if the token is still valid
  if (authStorage && authStorage.logged_in && authStorage.expires < Date.now()) {
    // If our last login is valid, update our auth to the local storage value
    initialState = authStorage;
  } else {
    // If not, create our initial state
    initialState = {
      logged_in: false,
      token: null,
      token_type: null,
      expires: null,
    };

    // Also update local storage
    localStorage.setItem('auth', initialState);
  }

  // Initialize our auth state
  const [auth, setAuth] = React.useState(initialState);

  // Create a new instance of the API class
  const api = new API(auth, setAuth);

  // Grab the children from the function props
  const { children } = props;

  // Return the auth provider
  return (
    <AuthContext.Provider value={{
      ...auth,
      api,
    }}
    >
      {React.Children.toArray(children)}
    </AuthContext.Provider>
  );
}
