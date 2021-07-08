import React from "react";
import Link from "react-router-dom";
import { useHistory } from "react-router-dom";

const PollList = ({ polls_data }) => {
  const history = useHistory();

  const showpolls = id => {
    history.push(`poll/${id}/show`);
  };

  return (
    <ul className="ml-8">
      {polls_data.map(poll => (
        <li
          key={poll.id}
          className="purple-300 justify-between items-center"
          onClick={() => showpolls(poll.id)}
        >
          {poll.title}
        </li>
      ))}
    </ul>
  );
};

export default PollList;
