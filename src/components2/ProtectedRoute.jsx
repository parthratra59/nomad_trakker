import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Home from "./Home";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { tokenpara } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (tokenpara === null) {
    navigate("/home");
  } else {
    return <Dashboard />;
  }
};

export default ProtectedRoute;