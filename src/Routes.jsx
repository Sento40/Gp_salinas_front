import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route, Redirect,
} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';
import client from './client';
import Home from './components/Home/home';

class Routes extends Component {
  render() {
    /* const PrivateRoute = ({component: Component, ...rest}) => (
      <Route {...rest} render = {(props) => (
          checkToken() === true ? <Component {...props}/> : <Redirect to="/"/>
      )}/>
    ); */
    return (
      <Router>
        <main>
          <ApolloProvider client={client}>
            <Route exact path = "/:dev/" component={Home} />
          </ApolloProvider>
        </main>
      </Router>
    );
  }
}

export default Routes;
