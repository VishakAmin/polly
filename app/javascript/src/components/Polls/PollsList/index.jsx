import React from "react";
import { useHistory } from "react-router-dom";
import { getFromLocalStorage } from "helpers/storage";
import Button from "components/Button";
import { logger } from "common/logger";

const PollList = ({ polls_data, delete_Polls }) => {
  const history = useHistory();

  const userId = getFromLocalStorage("authUserId");

  const showpolls = id => {
    history.push(`polls/${id}/show`);
  };

  const updatePolls = id => {
    history.push(`polls/${id}/edit`);
  };

  return (
    <ul className="mb-8">
      {polls_data.map(poll => (
        <li
          key={poll.id}
          className="flex justify-between items-center py-4 border-b"
        >
          <span
            onClick={() => showpolls(poll.id)}
            className="hover:text-purple-700 text-lg"
          >
            {poll.title}
          </span>
          {userId == poll.user_id ? (
            <div className="flex justify-between items-center gap-x-2">
              <Button
                size="small"
                onClick={() => updatePolls(poll.id)}
                buttonText="Edit"
                type="link"
              />
              <Button
                size="small"
                onClick={() => delete_Polls(poll.id)}
                buttonText="Delete"
              />
            </div>
          ) : (
            ""
          )}
        </li>
      ))}
    </ul>
  );
};

export default PollList;
