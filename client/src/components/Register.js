import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    //take all the original inputs and add the targeted one with the new value we add for it
    // aka set e.target.name to whatever value we specify within that input
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault(); //by default, it will refresh
    try {
      const body = { email, password, name }; // this is comming fro the state

      const response = await fetch("http://localhost:5000/auth/register", {
        //by def, fetch makes a GET request
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      }); //he JSON.stringify() method converts a JavaScript object or value to a JSON string

      //the data we're getting back is json, so we need to parse it before using it
      const parseRes = await response.json();
      // console.log(parseRes); // token

      //send that token to local storage:
      // .token pt ca asta e numele ce i l-am setat pe serv
      localStorage.setItem("token", parseRes.token);

      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={(e) => onChange(e)}
        ></input>
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login"> Login </Link>
    </Fragment>
  );
};

export default Register;
