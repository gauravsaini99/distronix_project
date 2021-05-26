import React from 'react';
import './App.css';
import LoginComponent from './components/Login';
import DrawerPage from './components/Drawer';
import {Route, Switch, Redirect} from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path='/' exact>
          <Redirect to = '/login' />
        </Route>
        <Route path = '/login'>
          <LoginComponent />
        </Route>
        <Route path = '/drawer/:page/:param?'>
          <DrawerPage />
        </Route>
    </Switch>
    </React.Fragment>
  );
}

export default App;
