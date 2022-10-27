import React from "react";
import { useParams } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

import "../../user/components/UserItem.css";

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
const USERS = [
  { id: "u1", name: "Vignesh Natarajan", image: "", portfolios: "2" },
];

const Portfolio = () => {
  const portfolioId = useParams().portfolioId;
  const userId = useParams().userId;

  const loadedPortfolios = DUMMY_PORTFOLIOS.filter(
    (portfolio) => portfolio.id === portfolioId
  );
  const user = USERS.filter((user) => user.id === userId);

  return (
    <Card className="portfolio-item__content">
      <div className="user-item__image">
        <Avatar image={user.image} alt={user.name} />
      </div>
      <div className="user-item__info">
        <h1>{user.name}</h1>
      </div>
    </Card>
  );
};

export default Portfolio;
