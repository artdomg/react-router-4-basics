import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect,
  Prompt
} from 'react-router-dom';

import './App.css';

const loggedIn = true;

const Home = () => <h1>Home</h1>;

class Contact extends React.Component {
  state = { dirty: false }
  setDirty = () => this.setState({ dirty: true })
  render() {
    return (
      <div>
        <h1>Contact</h1>
        <input type="text" onInput={this.setDirty} />
        <Prompt message="Unsaved data will be lost" when={this.state.dirty} />
      </div>
    )
  }
}

class Redirection extends React.Component {
  componentDidMount() {
    setTimeout(() => this.props.history.push('/'), 3000);
  }
  render() {
    return (
      <h1>Redirecting in 3 seconds...</h1>
    )
  }
}

const Links = () => (
  <nav>
    <NavLink activeClassName="active" exact to="/">Home</NavLink>
    <NavLink activeClassName="active" to="/protected">Protected</NavLink>
    <NavLink activeClassName="active" to="/contact">Contact</NavLink>
    <NavLink activeClassName="active" to="/menu">Menu</NavLink>
    <NavLink activeClassName="active" to="/search?foo=bar">Search</NavLink>
    <NavLink activeClassName="active" to="/redirection">Redirection</NavLink>
  </nav>
);

const Menu = () => (
  <div>
    <h1>Menu</h1>
    <NavLink to="/menu/food">Food</NavLink>
    <NavLink to="/menu/drinks">Drinks</NavLink>
    <NavLink to="/menu/sides">Sides</NavLink>
    <Switch>
      <Redirect from="/menu/oldfood" to="/menu/food" />
      <Route path="/menu/:section" render={({ match }) => <h2>{match.params.section}</h2>} />
    </Switch>
  </div>
);

const App = () => (
  <Router>
    <div>
      <Links />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/protected" render={() => (
          loggedIn ? <h1>Protected</h1> : <Redirect to="/" />
        )} />
        <Route path="/contact" component={Contact} />
        <Route path="/menu" component={Menu} />
        <Route path="/redirection" component={Redirection} />
        <Route path="/user/:id(\d+)" render={({ match }) => <h1>{match.params.id}</h1>} />
        <Route path="/search" render={({ match, location }) => <h1>{JSON.stringify(location)}</h1>} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </div>
  </Router>
);

export default App;
