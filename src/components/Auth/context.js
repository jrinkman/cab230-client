import React from 'react';

// Export a newly created context
export default React.createContext({
  loggedIn: false,
  token: null,
  token_type: null,
  expires: null,
});
