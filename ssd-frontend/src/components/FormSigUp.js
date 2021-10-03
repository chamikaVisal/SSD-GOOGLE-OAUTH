import React from "react";
import "./Form.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
function FormSigUp({}) {
  const [link, setLink] = useState();

  useEffect(() => {
    axios({
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },

      method: "get",
      url: "http://localhost:4000/getAuthURL",
    }).then((response) => {
      console.log("Arrived to send request");
      console.log(response.data);
      setLink(response.data);
    });

    console.log("p");
  });

  const history = useHistory();

  const handleButton = () => {
    console.log("clicked");
    let path = "/Home";
    history.push(path);
  };

  const handleGoogleLogin = () => {
    console.log("handle google login");
  };
  const handleSubmit = () => {
    console.log("handle google login");
  };
  return (
    <div className="form-content-right">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <div className="form-inputs">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Confirm Password</label>
          <input
            className="form-input"
            type="password"
            name="password2"
            placeholder="Confirm your password"
          />
        </div>
        <button className="form-input-btn" type="submit">
          Sign up
        </button>
        <span className="form-input-login">OR Sign Up with</span>
        <div className="card-footer" style={{ width: 440, marginLeft: 80 }}>
          <a href={link}>
            <button type="button" className="form-input-btn-google">
              GOOGLE
            </button>
          </a>
        </div>

        <span className="form-input-login">
          Already have an account? Login <a href="/Login">here</a>
        </span>
      </form>
    </div>
  );
}

export default FormSigUp;
