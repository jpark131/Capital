import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home";
import NavBar from "./components/common/navbar";
import Transaction from "./components/transaction";
import Login from "./components/login";
import Register from "./components/register";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "./App.css";
import About from "./components/about";
import NotFound from "./components/notFound";
import Profile from "./components/profile";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main>
          <Switch>
            <ProtectedRoute path="/transaction/:id" component={Transaction} />
            <ProtectedRoute path="/home" component={Home} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/about" component={About} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/about" exact />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
