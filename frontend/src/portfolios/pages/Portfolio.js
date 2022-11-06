import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

import { AuthContext } from "../../shared/context/auth-context";
import Modal from "../../shared/components/UIElements/Modal";

import "./Portfolio.css";

const Portfolio = () => {
  const [loadedUser, setLoadedUser] = useState();
  const [loadedPortfolio, setLoadedPortfolio] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const portfolioId = useParams().portfolioId;
  const userId = useParams().userId;

  const auth = useContext(AuthContext);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/portfolios/${portfolioId}`,
        "DELETE"
      );
      // props.onDelete(props.id);
      history.push(`/${userId}/portfolios`);
    } catch (err) {}
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${userId}`
        );
        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    const fetchPortfolio = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/portfolios/${portfolioId}`
        );
        setLoadedPortfolio(responseData.portfolio);
      } catch (err) {}
    };

    fetchUser();
    fetchPortfolio();
  }, [sendRequest, userId]);

  return (
    <ul className="portfolio">
      <ErrorModal error={error} onClear={clearError} />
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
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPortfolio && loadedUser && (
        <>
          <li className="portf-item">
            <div className="portf-item__image">
              <Avatar image={loadedUser.image} alt={loadedUser.name} />
            </div>
            <div className="portf-item__info">
              <h2>
                {loadedUser.name}
                {" - "}
                <div style={{ color: "#a5a5a5", display: "inline-block" }}>
                  {loadedPortfolio.title}
                </div>
                <div style={{ fontSize: "15pt" }}>
                  {loadedPortfolio.description}
                </div>
              </h2>
            </div>
          </li>
          {auth.userId === userId && (
            <li style={{ textAlign: "center" }}>
              <Button to={`/${userId}/portfolios/${portfolioId}/edit`}>
                Edit Portfolio
              </Button>
              <Button danger onClick={showDeleteWarningHandler}>
                Delete Portfolio
              </Button>
            </li>
          )}
          {loadedPortfolio.components.map((component) => (
            <li>
              <div
                style={{
                  fontSize: "20pt",
                  color: "#ffffff",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                {component.title}
                {component.description}
              </div>
              <Card>
                {component.components.map((subcomponent) => (
                  <>
                    <div
                      style={{
                        fontSize: "18pt",
                        color: "#ffffff",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      {subcomponent.title}
                    </div>
                    <div
                      style={{
                        fontSize: "15pt",
                        color: "#ffffff",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      {subcomponent.description}
                    </div>
                  </>
                ))}
              </Card>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default Portfolio;
