import React from "react";
import { useHistory } from "react-router-dom";
import { getFromLocalStorage } from "helpers/storage";
import Button from "components/Button";

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
    <ul className="mb-8 mt-5">
      {polls_data.map(poll => (
        <li
          key={poll.id}
          className="bg-purple-100 flex justify-between items-center py-4 px-2 border-b rounded-md hover:bg-opacity-75 cursor-default "
        >
          <span
            onClick={() => showpolls(poll.id)}
            className="hover:text-bb-purple text-lg font-medium cursor-pointer   align-middle pr-2 text-xl"
          >
            {poll.title}
          </span>
          {userId == poll.user_id ? (
            <div className="flex justify-between  gap-x-2">
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
