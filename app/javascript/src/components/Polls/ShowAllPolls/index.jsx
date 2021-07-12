import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "components/Button";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";
import { getFromLocalStorage } from "helpers/storage";
import responsesApi from "apis/response";

const ShowAllPolls = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [votedoptionByUser, setVotedoptionByUser] = useState(null);
  const [votes, setVotes] = useState([]);

  const userId = getFromLocalStorage("authUserId");

  const fetchPollDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      const pollResponse = await response.data.responses.find(
        v => v.user_id == userId
      );
      setTitle(response.data.poll.title);
      setOptions(response.data.options);
      setVotes(response.data.responses);
      if (pollResponse) {
        setVotedoptionByUser(pollResponse.option_id);
        setIsVoted(Boolean(pollResponse));
      }
    } catch (error) {
      logger.error(error);
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await responsesApi.create({
        response: { poll_id: id, option_id: votedoptionByUser },
      });
      setLoading(false);
      fetchPollDetails();
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  const votePercentage = optionId => {
    if (!votes.length) {
      return "0";
    }
    const filterVote = votes.filter(vote => vote.option_id == optionId);

    const option_percentage = (filterVote.length * 100) / votes.length;

    return option_percentage % 1
      ? option_percentage.toFixed(2)
      : option_percentage;
  };

  return (
    <Container>
      <h1 className="pb-4 px-12 text-xl font-bold border-b text-bb-purple">
        {title}
      </h1>
      <ul className="px-6 mt-4">
        {options?.map(option => (
          <li key={option?.id} className="my-8 block w-full">
            <span
              className={`border rounded p-3 w-3/4 inline-block cursor-pointer hover:bg-bb-purple hover:text-white ${
                option.id === votedoptionByUser
                  ? "bg-bb-purple text-white shadow-md"
                  : ""
              } ${isVoted ? "pointer-events-none" : ""}`}
              onClick={() => setVotedoptionByUser(option.id)}
            >
              {option?.content}
            </span>
            {isVoted ? (
              <span className="w-1/4 pl-2">{votePercentage(option.id)}%</span>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>

      <div className="flex justify-center px-6">
        {isVoted ? (
          <p>Thank for Votings..!!!</p>
        ) : (
          <Button
            loading={loading}
            size="small"
            buttonText="submit"
            onClick={handleSubmit}
          />
        )}
      </div>
      <h6>{votes.option_id}</h6>
    </Container>
  );
};

export default ShowAllPolls;
