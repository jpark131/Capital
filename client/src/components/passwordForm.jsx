import React from "react";
import Joi from "joi-browser";
import "../view/css/transaction.css";
import Form from "./common/form";
import { changePassword } from "../services/userService";

class PasswordForm extends Form {
  state = {
    data: { password: "" },
    errors: {},
  };

  schema = {
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async ({ password }) => {
    await changePassword(password);

    window.location = "/home";
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div className="transaction">
        {errors.password && (
          <div className="alert text-danger">
            {errors[Object.keys(errors)[0]]}
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="password"> New Password: </label>
          <input
            type="text"
            id="password"
            name="password"
            value={data.password}
            error={errors.password}
            onChange={this.handleChange}
          />
          <button
            style={{ backgroundColor: "#8684e7" }}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default PasswordForm;
