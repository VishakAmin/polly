import React, { useState } from "react";
import Container from "components/Container";
import PollForm from "components/Polls/Form/PollForm";
import pollsApi from "apis/polls";
import { logger } from "common/logger";

const CreatePoll = ({ history }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([
    { content: "" },
    { content: "" },
    { content: "" },
    { content: "" },
  ]);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await pollsApi.create({ poll: { title, options_attributes: options } });
      setLoading(false);
      history.push("/");
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <PollForm
        title={title}
        setTitle={setTitle}
        loading={loading}
        handleSubmit={onSubmit}
        setOptions={setOptions}
        options={options}
      />
    </Container>
  );
};

export default CreatePoll;
