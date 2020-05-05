import React from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Switch, Route, useLocation,
} from 'react-router-dom';

// View imports
import Home from './views/Home';
import Stocks from './views/Stocks';
import NotFound from './views/NotFound';

// Layout import
import Layout from './components/Layout';

export default function Main() {
  // Get our current page location
  const location = useLocation();

  // Render the main body of the page
  return (
    <Layout>
      <AnimatePresence>
        <Switch location={location} key={location.pathname}>
          <Route
            path="/"
            exact
            component={Home}
          />
          <Route path="/stocks" component={Stocks} />
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
    </Layout>
  );
}
