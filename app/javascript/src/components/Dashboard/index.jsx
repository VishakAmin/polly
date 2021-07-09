import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Button from "components/Button";
import PollList from "components/Polls/PollsList";
import pollsApi from "apis/polls";
import PageLoader from "components/PageLoader";
import { isNil, isEmpty, either } from "ramda";
import { logger } from "common/logger";

import useHistory from "react-router-dom";

const Dashboard = ({ history }) => {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPolls = async () => {
    try {
      const result = await pollsApi.list();
      setPolls(result.data.polls);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const createPoll = () => {
    history.push("/create");
  };

  const deletePolls = async id => {
    try {
      await pollsApi.destroy(id);
      await fetchPolls();
    } catch (error) {
      logger.error(error);
    }
  };

  if (loading) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex justify-between items-center">
        <h1 className="text-bb-purple text-4xl font-medium">Polls</h1>
        <Button
          type="button"
          buttonText="Create"
          loading={false}
          onClick={createPoll}
        />
      </div>
      {either(isNil, isEmpty)(polls) ? (
        <h1 className="text-3xl leading-5 text-center pt-6">NO POLLS.</h1>
      ) : (
        <PollList polls_data={polls} delete_Polls={deletePolls} />
      )}
    </Container>
  );
};

export default Dashboard;
