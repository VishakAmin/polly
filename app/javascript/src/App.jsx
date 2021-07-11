import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "common/logger.js";
import Dashboard from "components/Dashboard";
import CreatePoll from "components/Polls/CreatePoll";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import ShowAllPolls from "components/Polls/ShowAllPolls";
import UpdatePoll from "components/Polls/UpdatePoll";
import Signup from "components/Authentication/Signup";
import { either, isEmpty, isNil } from "ramda";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import PageLoader from "components/PageLoader";
import { getFromLocalStorage } from "helpers/storage";
import NavBar from "components/NavBar";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <NavBar isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
        <PrivateRoute
          path="/polls/:id/show"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={ShowAllPolls}
        />
        <PrivateRoute
          path="/polls/:id/edit"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={UpdatePoll}
        />
        <PrivateRoute
          path="/create"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={CreatePoll}
        />
      </Switch>
    </Router>
  );
};

export default App;
