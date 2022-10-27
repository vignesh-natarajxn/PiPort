import { Link, useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";

import "./PortfolioItem.css";

const PortfolioItem = (props) => {
  const userId = useParams().userId;

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/${userId}/portfolios/${props.id}`}
    >
      <li className="portfolio-item">
        <Card className="portfolio-item__content">
          <div className="portfolio-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="portfolio-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="portfolio-item__actions"></div>
        </Card>
      </li>
    </Link>
  );
};

export default PortfolioItem;
