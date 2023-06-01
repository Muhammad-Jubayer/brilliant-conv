import { useState } from "react";
import { NavLink } from "react-router-dom";

import { token } from "../authInfo";

const SignUp = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to the backend
    fetch("http://localhost:3400/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the response from the backend
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <form className="Signup" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="name"
          id="name"
          value={formValue.name}
          placeholder="Full name"
        />
        <input
          type="email"
          onChange={handleChange}
          name="email"
          id="email"
          value={formValue.email}
          placeholder="Email"
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          value={formValue.password}
          placeholder="Password"
        />
        <input
          type="submit"
          name="submitSignup"
          id="submitSignup"
          value="Submit"
        />
      </form>
    </>
  );
};

function SignIn() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("fatching");
    // Send form data to the backend
    fetch("http://localhost:3400/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the response from the backend
        token = data.accessToken;
        console.log(data);
        console.log(token);
      })
      .catch((error) => {
        console.log("Found error");
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        onChange={handleChange}
        name="email"
        id="email"
        value={formValue.email}
        placeholder="Email"
      />
      <input
        onChange={handleChange}
        type="password"
        name="password"
        id="password"
        value={formValue.password}
        placeholder="Password"
      />
      <input
        type="submit"
        name="submitSignup"
        id="submitSignup"
        value="Submit"
      />
    </form>
  );
}

function SignInButton() {
  return (
    <>
      <NavLink to="/signup">
        <button style={buttonStyle}>Sign Up</button>
      </NavLink>
    </>
  );
}

function SignUpButton() {
  return (
    <>
      <NavLink to="/signin">
        <button style={buttonStyle}>Sign In</button>
      </NavLink>
    </>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "10px",
  margin: "5px",
  backgroundColor: "white",
  border: "1px solid black",
};

export { SignUp, SignIn, SignInButton, SignUpButton };
