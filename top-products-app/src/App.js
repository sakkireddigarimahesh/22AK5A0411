// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ProductListPage />
        </Route>
        <Route path="/product/:productId">
          <ProductDetailsPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
