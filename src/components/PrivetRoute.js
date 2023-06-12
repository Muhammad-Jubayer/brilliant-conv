import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import { SignUp } from "./Authenticate";

export default function PrivetRoute({ ...rest }) {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Route {...rest} />
  ) : (
    <Route exact path="/signup" element={<SignUp />} />
  );
}
