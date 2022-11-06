import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PortfolioList from "../components/PortfolioList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPortfolios = () => {
  const [loadedPortfolios, setLoadedPortfolios] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/portfolios/user/${userId}`
        );
        setLoadedPortfolios(responseData.portfolios);
      } catch (err) {}
    };
    fetchPortfolios();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPortfolios && (
        <PortfolioList items={loadedPortfolios} />
      )}
    </React.Fragment>
  );
};

export default UserPortfolios;
