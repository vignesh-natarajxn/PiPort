import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

import { AuthContext } from "../../shared/context/auth-context";
import Modal from "../../shared/components/UIElements/Modal";

import "./Portfolio.css";

const DUMMY_PORTFOLIOS = [
  {
    id: "u1r1",
    creator: "u1",
    title: "Software Development Engineer",
    description: "I like to type stuff.",
    image:
      "https://cutewallpaper.org/22/minimal-programming-wallpapers/930213660.jpg",
    components: [
      {
        title: "Professional Experience",
        description: "",
        image: "",
        components: [
          {
            title: "Experience 1",
            date: "01/01/2001 - 01/01/2010",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
          {
            title: "Experience 2",
            date: "02/02/2002 - 02/02/2020",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
        ],
      },
      {
        title: "Projects",
        description: "",
        image: "",
        components: [
          {
            title: "Experience 1",
            date: "01/01/2001 - 01/01/2010",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
          {
            title: "Experience 2",
            date: "02/02/2002 - 02/02/2020",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "u1r2",
    creator: "u1",
    title: "Embedded Firmware Developer",
    description: "I give life to computers.",
    image: "https://cdn.wallpapersafari.com/23/71/Ow4QZ5.png",
    components: [
      {
        title: "Professional Experience",
        description: "",
        image: "",
        components: [
          {
            title: "Experience 1",
            date: "01/01/2001 - 01/01/2010",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
          {
            title: "Experience 2",
            date: "02/02/2002 - 02/02/2020",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
        ],
      },
      {
        title: "Projects",
        description: "",
        image: "",
        components: [
          {
            title: "Experience 1",
            date: "01/01/2001 - 01/01/2010",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
          {
            title: "Experience 2",
            date: "02/02/2002 - 02/02/2020",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "u2r1",
    creator: "u2",
    title: "Chief Executive Officer - Earth",
    description: "I am your creator.",
    image:
      "https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/web_first_images_release.png?itok=g21NrdRw",
    components: [
      {
        title: "Professional Experience",
        description: "",
        image: "",
        components: [
          {
            title: "Experience 1",
            date: "01/01/2001 - 01/01/2010",
            description: "",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
          {
            title: "Experience 2",
            date: "02/02/2002 - 02/02/2020",
            description: "",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
        ],
      },
      {
        title: "Projects",
        description: "",
        image: "",
        components: [
          {
            title: "Experience 1",
            date: "01/01/2001 - 01/01/2010",
            description: "",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
          {
            title: "Experience 2",
            date: "02/02/2002 - 02/02/2020",
            description: "",
            image:
              "https://cdn.fansshare.com/photograph/backgroundhd/black-pattern-hd-wallpaper-pattern-1589253890.jpg",
          },
        ],
      },
    ],
  },
];

const Portfolio = () => {
  const [loadedUser, setLoadedUser] = useState();
  const [loadedPortfolio, setLoadedPortfolio] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING...");
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
          {auth.isLoggedIn && (
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
