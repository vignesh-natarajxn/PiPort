import React from "react";
import { useParams } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

import "./Portfolio.css";

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
    imageUrl: "https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/web_first_images_release.png?itok=g21NrdRw",
  },
];
const USERS = [
  {
    id: "u1",
    name: "Vignesh Natarajan",
    image:
      "https://preview.redd.it/vreph5xqwm311.jpg?auto=webp&s=c130c4e60ef9354cbbe15080a7fc51d521875bf5",
    portfolios: "2",
  },
  {
    id: "u2",
    name: "Yilong Musk",
    image: "https://pbs.twimg.com/media/EbbAWSuXQAIP3Vz?format=jpg&name=large",
    portfolios: "68",
  },
];

const Portfolio = () => {
  const portfolioId = useParams().portfolioId;
  const userId = useParams().userId;

  const portfolio = DUMMY_PORTFOLIOS.filter(
    (portfolio) => portfolio.id === portfolioId
  )[0];
  const user = USERS.filter((user) => user.id === userId)[0];

  return (
    <ul>
      <li className="portf-item">
        <div className="portf-item__image">
          <Avatar image={user.image} alt={user.name} />
        </div>
        <div className="portf-item__info">
          <h2>
            {user.name}
            {" - "}
            <div style={{ color: "#a5a5a5", display: "inline-block" }}>
              {portfolio.title}
            </div>
          </h2>
        </div>
      </li>
      <li></li>
    </ul>
  );
};

export default Portfolio;
