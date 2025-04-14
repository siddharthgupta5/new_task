import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Login, Register } from './components/Auth';
import Profile from './components/Profile/Profile';
import TaskList from './components/Tasks/TaskList';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile" render={() => 
          isAuthenticated ? <Profile /> : <Redirect to="/login" />
        } />
        <Route path="/tasks" render={() => 
          isAuthenticated ? <TaskList /> : <Redirect to="/login" />
        } />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default App;