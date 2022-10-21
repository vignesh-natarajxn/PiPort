import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PortfolioItem from './PortfolioItem';
import Button from '../../shared/components/FormElements/Button';
import './PortfolioList.css';

const PortfolioList = props => {
  if (props.items.length === 0) {
    return (
      <div className="portfolio-list center">
        <Card>
          <h2>No portfolios found. Maybe create one?</h2>
          <Button to="/portfolios/new">Share Portfolio</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="portfolio-list">
      {props.items.map(portfolio => (
        <PortfolioItem
          key={portfolio.id}
          id={portfolio.id}
          image={portfolio.imageUrl}
          title={portfolio.title}
          description={portfolio.description}
          creatorId={portfolio.creator}
        />
      ))}
    </ul>
  );
};

export default PortfolioList;
