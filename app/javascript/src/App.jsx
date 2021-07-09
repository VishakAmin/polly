import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { initializeLogger } from "common/logger.js";
import Dashboard from "components/Dashboard";
import CreatePoll from "components/Polls/CreatePoll";
import { ToastContainer } from "react-toastify";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import ShowAllPolls from "components/Polls/ShowAllPolls";
import UpdatePoll from "components/Polls/UpdatePoll";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/create" component={CreatePoll} />
        <Route exact path="/polls/:id/show" component={ShowAllPolls} />
        <Route exact path="/polls/:id/edit" component={UpdatePoll} />
      </Switch>
    </Router>
  );
};

export default App;
