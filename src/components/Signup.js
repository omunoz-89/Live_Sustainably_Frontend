// Imports
import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check to make sure passwords match
    if (password === confirmPassword && password.length >= 8) {
      const payload = { name, email, password };
      let url = `${REACT_APP_SERVER_URL}/api/users/signup`;
      try {
        let response = await axios.post(url, payload);
        let { data } = response;
        setRedirect(true);
      } catch (error) {
        alert("Error occurred, please try again...");
      }
    } else {
      if (!password === confirmPassword) {
        alert(
          "Password and Confirm Password need to match. Please try again..."
        );
      } else {
        alert(
          "Password needs to be at least 8 characters or more. Please try again..."
        );
      }
    }
  };

  if (redirect) return <Redirect to="/login" />;

  return (
    <div className="columns">
      <div className="column is-4 is-offset-4">
        <div className="card">
          <h2 id='form-title' className="column is-2 is-offset-5">Signup</h2>
          <form onSubmit={handleSubmit} className="field">
            <div className="field column">
              <label htmlFor="name" className="label">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
                className="input"
              />
            </div>
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
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPassword}
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

export default Signup;
