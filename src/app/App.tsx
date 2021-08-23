import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import Dashboard from './pages/Dashboard/Dashboard';
import Edit from './pages/Edit/Edit';
import Password from './pages/Password/Password';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/credential/add">
          <Add />
        </Route>
        <Route path="/credential/:service/edit">
          <Edit />
        </Route>
        <Route path="/password/:service">
          <Password />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
