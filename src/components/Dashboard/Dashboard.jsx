import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "../Header/Header";

const Dashboard = () => {
  // Here, authLoading and profileLoading are variable names you've chosen to hold the loading states from the Redux store slices. You can name them anything you want.
  const { loading: authLoading } = useSelector((hello) => hello.auth);
  const { laoding: profileLoading } = useSelector((hello) => hello.profile);

  if (authLoading || profileLoading) {
    return (
      <div className="mt-10">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="bg-newpink min-h-screen overflow-auto ">
        <div className="drop-shadow-2xl ">
          <Header />
        </div>
        <div className="flex ">
          <Sidebar />

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
