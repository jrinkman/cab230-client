import React from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  Switch, Route, useLocation,
} from 'react-router-dom';

// View imports
import Home from './views/Home';
import Stocks from './views/Stocks';
import Details from './views/Details';
import NotFound from './views/NotFound';

// Layout import
import Layout from './components/Layout/new';

export default function Main(props) {
  // Grab our theme props
  const { theme, toggleDarkMode } = props;

  // Get our current page location
  const location = useLocation();

  // Render the main body of the page
  return (
    <Layout theme={theme} toggleDarkMode={toggleDarkMode}>
      <AnimatePresence>
        <Switch location={location} key={location.pathname}>
          <Route
            path="/"
            exact
            component={Home}
          />
          <Route exact path="/stocks" component={Stocks} />
          <Route path="/stocks/:symbol" component={Details} />
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
    </Layout>
  );
}
