import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';

import UserDetails from 'components/UserDetails';
import UsersList from 'components/UsersList';


class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" render={()=> <Redirect to="/users" />} />
        <Route exact component={UsersList} path="/users" />
        <Route component={UserDetails} path="/users/:userId" />
      </div>
    );
  }
}

export default App;
