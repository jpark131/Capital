import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import "../view/css/login.css";
import { Link, Redirect } from "react-router-dom";
import auth from "../services/authService";
import EmailPass from "./common/emailPass";

class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async (user) => {
    try {
      await auth.login(user);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/home";
    } catch (ex) {
      const errors = { ...this.state.errors };
      errors.email = ex.response.data;
      this.setState({ errors });
    }
  };

  render() {
    if (auth.getUser()) return <Redirect to="/" />;
    const { data, errors } = this.state;
    return (
      <div className="login-container">
        <ul>
          <li>Welcome Back!</li>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <EmailPass data={data} errors={errors} onChange={this.handleChange} />
          <button type="submit" className="Login" disabled={this.validate()}>
            Login
          </button>
          <div className="registration">
            <p>Need an account?</p>
            <Link to="/register" className="cta">
              Register here!
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
