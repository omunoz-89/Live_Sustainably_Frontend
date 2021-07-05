// Imports
import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import { Redirect } from "react-router-dom";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    axios
      .post(`${REACT_APP_SERVER_URL}/api/users/login`, userData)
      .then((response) => {
        const { token } = response.data;
        // Save token to localStorage
        localStorage.setItem("jwtToken", token);
        // Set token to auth header
        setAuthToken(token);
        // Decode token to get the user data
        const decoded = jwt_decode(token);
        // Set current user
        props.nowCurrentUser(decoded);
      })
      .catch((error) => {
        console.log(error);
        alert("Either email or password is incorrect. Please try again.");
      });
  };

  if (props.user) return <Redirect to="/profile" />;

  return (
    <div className="columns">
      <div className="column is-4 is-offset-4">
        <div className="card">
          <h2 id='form-title' className="column is-2 is-offset-5">Login</h2>
          <form onSubmit={handleSubmit} className="field">
            <div className="field column">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmail}
                className="input"
              />
            </div>
            <div className="field column">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePassword}
                className="input"
              />
            </div>
            <div className="field column">
              <button
                id="signup-btn"
                type="submit"
                className="column is-8 is-offset-2 button is-info is-medium is-fullwidth"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
