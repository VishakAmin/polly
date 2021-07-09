import React from "react";
import Link from "react-router-dom";
import { useHistory } from "react-router-dom";

const PollList = ({ polls_data }) => {
  const history = useHistory();

  const showpolls = id => {
    history.push(`polls/${id}/show`);
  };

  const updatePolls = id => {
    history.push(`polls/${id}/edit`);
  };

  return (
    <ul className="ml-8">
      {polls_data.map(poll => (
        <li key={poll.id}>
          <span
            className="purple-300 justify-between items-center"
            onClick={() => showpolls(poll.id)}
          >
            {poll.title}
          </span>
          <span className="px-5" onClick={() => updatePolls(poll.id)}>
            Edit
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PollList;
