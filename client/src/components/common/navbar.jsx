import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import "../../view/css/nav-bar.css";
import logo from "../../view/images/logo-temp.png";
import { getUserObject } from "../../services/userService";

class NavBar extends Component {
  state = {
    user: {},
  };
  async componentDidMount() {
    this.props.history.listen(() => {
      const shouldLogout = window.location.pathname === "/login" ? true : false;
      this.setState({ loggedIn: !shouldLogout });
    });
    const user = await getUserObject();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="logo pl-2" to="/home">
          <img src={logo} alt="Capital logo" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav mx-auto">
            {user && (
              <React.Fragment>
                <NavLink
                  className="nav-transaction nav-item nav-link col text-center text-nowrap"
                  to="/transaction/new"
                >
                  New Transaction
                </NavLink>

                <NavLink
                  className="nav-item nav-link col text-nowrap"
                  to="/profile"
                >
                  {user.name}'s Profile
                </NavLink>

                <NavLink
                  className="nav-item nav-link col"
                  onClick={this.handleLogout}
                  to="/logout"
                >
                  Logout
                </NavLink>
              </React.Fragment>
            )}
            {!user && (
              <NavLink className="nav-item nav-link col login" to="/login">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
