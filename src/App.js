/** @format */

import React, { Suspense, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Containers/HomePage/homePage";
import AddItem from "./Containers/AddItem/index";
import { ToastContainer } from "react-toastify";

const App = () => {
  let routes = (
    <Switch>
      <Route path="/add-item" component={AddItem} />
      <Route path="/edit-item" component={AddItem} />
      <Route path="/view-book-details" component={AddItem} />
      <Route path="/" component={HomePage} />
    </Switch>
  );

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading..</div>}>{routes}</Suspense>
        <ToastContainer position="bottom-right" autoClose={1500} />
      </Router>
      {/* <ToastContainer newestOnTop={false} position="bottom-right" /> */}
    </>
  );
};

export default App;
