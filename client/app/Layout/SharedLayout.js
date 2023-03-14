import React, { Fragment } from "react";
import { Navbar } from "../components";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
};

export default SharedLayout;
