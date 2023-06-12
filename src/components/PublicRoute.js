import React from "react";
import { Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Home from "./pages/Home";

export default function PublicRoute({ ...rest }) {
  const { currentUser } = useAuth();
  return !currentUser ? (
    <Route {...rest} />
  ) : (
    <Route exact path="/" element={<Home />} />
  );
}
