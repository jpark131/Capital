import React from "react";
import "../view/css/profile.css";
import Joi from "joi-browser";
import Form from "./common/form";
import { getUserObject, changeProfile } from "../services/userService";
import { Link } from "react-router-dom";

class Profile extends Form {
  state = {
    data: { name: "", email: "", password: "", budget: 0 },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Username"),
    password: Joi.string().required().label("Password"),
    budget: Joi.number().min(0).required().label("Budget"),
  };

  doSubmit = async (profile) => {
    delete profile.password;
    await changeProfile(profile);

    //window.location = "/home";
  };

  async populateProfile() {
    try {
      const user = await getUserObject();
      const toState = {
        name: user.name,
        email: user.email,
        password: "test",
        budget: user.budget,
      };
      this.setState({ data: toState });
    } catch (ex) {
      this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateProfile();
  }

  render() {
    const { data, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        {(errors.name || errors.email || errors.budget) && (
          <div className="alert text-danger">
            {errors[Object.keys(errors)[0]]}
          </div>
        )}
        <table className="container">
          <thead>
            <tr>
              <th id="table-header">Profile Settings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td></td>
              <td>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.date}
                  error={errors.date}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td></td>
              <td>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={data.date}
                  error={errors.date}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Password (Non-functional)</td>
              <td></td>
              <td>
                <Link className="btn btn-primary" to="/change-pass">
                  Change
                </Link>
              </td>
            </tr>
            <tr>
              <td>Monthly Budget</td>
              <td></td>
              <td>
                <input
                  type="text"
                  id="budget"
                  name="budget"
                  value={data.date}
                  error={errors.date}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Notification Settings (Non-functional)</td>
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
          </tbody>
        </table>
        <button type="submit" className="Login">
          Save
        </button>
      </form>
    );
  }
}

export default Profile;
