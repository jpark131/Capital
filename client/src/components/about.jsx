import React from "react";
import "../view/css/about.css";
import { Link } from "react-router-dom";
import auth from "../services/authService";

const About = () => {
  return (
    <div class="temp">
      <h1>
        Welcome to Capital! This is a web application aimed to help you keep
        track of your finances. Create an account, then begin adding
        transactions so you can see statistics regarding your finances. Enjoy!
      </h1>
      {auth.getUser() && (
        <Link
          className="btn btn-primary"
          to="/home"
          style={{ fontSize: "10em" }}
        >
          Dashboard
        </Link>
      )}
      {auth.getUser() === null && (
        <Link
          className="btn btn-primary"
          to="/login"
          style={{ fontSize: "10em" }}
        >
          Log In
        </Link>
      )}
    </div>
  );
};

export default About;
