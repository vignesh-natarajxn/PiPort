import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
// import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from "../../shared/context/auth-context";
import "./PortfolioItem.css";

const PortfolioItem = (props) => {
  const auth = useContext(AuthContext);
  // const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const userId = useParams().userId;

  // const openMapHandler = () => setShowMap(true);

  // const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING...");
  };

  return (
    <Link style={{ textDecoration: "none" }} to={`/${userId}/portfolios/${props.id}`}>
      {/* <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="portfolio-item__modal-content"
        footerClass="portfolio-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal> */}
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="portfolio-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to permanently delete this portfolio? Please note that
          this cannot be undone.
        </p>
      </Modal>
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
          <div className="portfolio-item__actions">
            {/* <Button inverse onClick={openMapHandler}>
              OPEN
            </Button> */}
            {auth.isLoggedIn && (
              <Button to={`/portfolios/${props.id}`}>EDIT</Button>
            )}

            {auth.isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </Link>
  );
};

export default PortfolioItem;
