import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import "../view/css/login.css";
import * as userService from "../services/userService";
import auth from "../services/authService";
import EmailPass from "./common/emailPass";

class Register extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async (user) => {
    //call server
    try {
      const response = await userService.register(user);
      auth.logInWithJwt(response.headers["x-auth-token"]);
      window.location = "/home";
    } catch (ex) {
      const errors = { ...this.state.errors };
      errors.email = ex.response.data;
      this.setState({ errors });
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className="login-container">
        <ul>
          <li>Registration</li>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={data.name}
            error={errors.name}
            onChange={this.handleChange}
          />
          <br />
          {errors.name && (
            <div className="alert alert-danger">{errors.name}</div>
          )}
          <EmailPass data={data} errors={errors} onChange={this.handleChange} />
          <button type="submit" className="Login">
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
