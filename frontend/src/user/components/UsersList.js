import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

import "./UserItem.css";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2 style={{ color: "white" }}>No users found.</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <li className="user-item">
          <Card className="user-item__content">
            <Link to={`/${user.id}/portfolios`}>
              <div className="user-item__image">
                <Avatar image={user.image} alt={user.name} />
              </div>
              <div className="user-item__info">
                <h2>{user.name}</h2>
                <h3>
                  {user.portfolios}{" "}
                  {user.portfolios === 1 ? "Portfolio" : "Portfolios"}
                </h3>
              </div>
            </Link>
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
