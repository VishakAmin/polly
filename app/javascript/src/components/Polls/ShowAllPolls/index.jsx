import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Container from "components/Container";
import PageLoader from "components/PageLoader";
import pollsApi from "apis/polls";

const ShowAllPolls = () => {
  const { id } = useParams();
  const [pollDetails, setPollDetails] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const fetchTaskDetails = async () => {
    try {
      const response = await pollsApi.show(id);
      setPollDetails(response.data.poll);
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
    return <PageLoader />;
  }

  return (
    <Container>
      <h1 className="pb-3 pl-3 mt-3 mb-3 text-lg leading-5 text-bb-gray border-b border-bb-gray">
        <span>Poll Title : </span> {pollDetails?.title}
      </h1>
    </Container>
  );
};

export default ShowAllPolls;
