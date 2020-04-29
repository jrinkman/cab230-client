import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Switch, Route, useLocation } from 'react-router-dom';

// View imports
import Home from './views/Home';
import Stocks from './views/Stocks';

export default function Main() {
  // Get our current page location
  const location = useLocation();

  // Render the main body of the page
  return (
    <main style={{
      display: 'flex', flexGrow: 1, overflow: 'hidden', position: 'relative', padding: '20px',
    }}
    >
      <AnimatePresence>
        <Switch location={location} key={location.pathname}>
          <Route
            path="/"
            exact
            component={Home}
          />
          <Route path="/stocks" component={Stocks} />
        </Switch>
      </AnimatePresence>
    </main>
  );
}
