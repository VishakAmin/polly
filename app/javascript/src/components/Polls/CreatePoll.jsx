import React, { useState } from "react";
import Container from "components/Container";
import PollForm from "components/Polls/Form/PollForm";
import pollApi from "apis/polls";
import { logger } from "common/logger";

const CreatePoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await pollApi.create({ poll: { title } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <PollForm setTitle={setTitle} loading={loading} handleSubmit={onSubmit} />
    </Container>
  );
};

export default CreatePoll;
