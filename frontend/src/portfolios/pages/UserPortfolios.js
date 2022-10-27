import React from "react";
import { useParams } from "react-router-dom";

import PortfolioList from "../components/PortfolioList";

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
];

const UserPortfolios = () => {
  const userId = useParams().userId;
  const loadedPortfolios = DUMMY_PORTFOLIOS.filter(
    (portfolio) => portfolio.creator === userId
  );
  return <PortfolioList items={loadedPortfolios} />;
};

export default UserPortfolios;
