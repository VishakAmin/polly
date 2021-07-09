import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PollForm from "components/Polls/Form/PollForm";
import pollsApi from "apis/polls";
import PageLoader from "components/PageLoader";
import { logger } from "common/logger";

const UpdatePoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const { id } = useParams();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await pollsApi.update({
        id,
        payload: { poll: { title } },
      });
      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };

  const fetchTaskDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      setTitle(response.data.poll.title);
      // setUserId(response.data.task.user_id);
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  if (pageLoading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <PollForm
        type="update"
        title={title}
        setTitle={setTitle}
        loading={loading}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default UpdatePoll;
