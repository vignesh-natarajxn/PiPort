import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PortfolioList from "../components/PortfolioList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UserPortfolios = () => {
  const DUMMY_PORTFOLIOS = [
    {
      id: "u1r1",
      creator: "u1",
      title: "Software Development Engineer",
      description: "I like to type stuff.",
      imageUrl:
        "https://cutewallpaper.org/22/minimal-programming-wallpapers/930213660.jpg",
    },
    {
      id: "u1r2",
      creator: "u1",
      title: "Embedded Firmware Developer",
      description: "I give life to computers.",
      imageUrl: "https://cdn.wallpapersafari.com/23/71/Ow4QZ5.png",
    },
    {
      id: "u2r1",
      creator: "u2",
      title: "Chief Executive Officer - Earth",
      description: "I am your creator.",
      imageUrl:
        "https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/web_first_images_release.png?itok=g21NrdRw",
    },
  ];
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
