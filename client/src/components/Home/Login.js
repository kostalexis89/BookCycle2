import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth";

export default function Login({ handleSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { loginUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("i am handling submit");
    const requestBody = { email, password };

    axios
      .post("/auth/login", requestBody)
      .then((response) => {
        const token = response.data.authToken;
        //call login user function from auth context
        loginUser(token);
        navigate("/");
      })
      .catch((err) => {
        const errorDescrition = err.response.data.message;
        setErrorMessage(errorDescrition);
      });
  };

  return (
    <>
      <h1 className="heading-one">Log In to BookCycle</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-inputs">
          <label>e-mail</label>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={handleEmail}
          />
          <label>password</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePassword}
          />
        </div>

        <button type="submit" id="submitBtn" className="btna btn-white">
          {" "}
          Log In
        </button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>

      <div className="form-inputs extra-margin">
        <label>You don't have an account ?</label>
        <button className="btna btn-white" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </>
  );
}
