import React from "react";
import "../view/css/profile.css";
import Joi from "joi-browser";
import Form from "./common/form";

class Profile extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <table className="container">
          <thead>
            <tr>
              <th id="table-header">Profile Settings</th>
            </tr>
          </thead>
          <tr>
            <td>Name</td>
            <td></td>
            <td>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Jane Doe"
              />
            </td>
          </tr>
          <tr>
            <td>Username</td>
            <td></td>
            <td>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="jane123"
              />
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td></td>
            <td>
              <input type="password" id="pw" name="pw" />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td></td>
            <td>
              <input type="text" id="email" name="email" />
            </td>
          </tr>
          <tr>
            <td>Notification Settings</td>
            <td></td>
            <td>
              <select name="notif" id="notif" placeholder="See More">
                <option value="See">See More</option>
                <option value="Text">Text</option>
                <option value="Email">Email</option>
                <option value="Both">Text + Email</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Monthly Budget</td>
            <td></td>
            <td>
              <input type="text" id="budget" name="budget" />
            </td>
          </tr>
        </table>
        <button type="submit" className="Login" disabled={this.validate()}>
          Save
        </button>
      </form>
    );
  }
}

export default Profile;
