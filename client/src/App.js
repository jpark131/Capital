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
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Redirect from="/" to="/home" exact />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
