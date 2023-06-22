import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const { signup } = useAuth();

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
    signup(formValue.email, formValue.password, formValue.name);
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
  const { login } = useAuth();

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formValue.email, formValue.password);
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
      <NavLink to="/signin">
        <button style={buttonStyle}>Sign in</button>
      </NavLink>
    </>
  );
}

function SignUpButton() {
  return (
    <>
      <NavLink to="/signup">
        <button style={buttonStyle}>Sign up</button>
      </NavLink>
    </>
  );
}

function LogoutButton() {
  const { logout } = useAuth();
  return <button onClick={() => logout()}>Sign Out</button>;
}

const buttonStyle = {
  width: "100%",
  padding: "10px",
  margin: "5px",
  backgroundColor: "white",
  border: "1px solid black",
};

export { SignUp, SignIn, SignInButton, LogoutButton, SignUpButton };
