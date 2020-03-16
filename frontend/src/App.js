import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import mathdb from './components/mathdb';
import proposition from './components/proposition';
import home from './components/home';
import Header from './components/header';
import search from './components/search'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={home} />
          <Route exact path='/definition' component={mathdb} />
          <Route exact path='/proposition' component={proposition} />
          <Route exact path='/search' component={search} />
        </Switch>


      </div>
    </Router>
  );
}

export default App;
