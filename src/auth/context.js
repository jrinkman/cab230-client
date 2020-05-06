import React from 'react';

// Export a newly created context
export default React.createContext({
  logged_in: false,
  token: null,
  token_type: null,
  expires: null,
});
