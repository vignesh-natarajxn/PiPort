import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./PortfolioForm.css";

const UpdatePortfolio = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPortfolio, setLoadedPortfolio] = useState();
  const portfolioId = useParams().portfolioId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: "",
        isValid: false,
      },
      components: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/portfolios/${portfolioId}`
        );
        setLoadedPortfolio(responseData.portfolio);
        setFormData(
          {
            title: {
              value: responseData.portfolio.title,
              isValid: true,
            },
            description: {
              value: responseData.portfolio.description,
              isValid: true,
            },
            image: {
              value: responseData.portfolio.image,
              isValid: true,
            },
            components: {
              value: responseData.portfolio.components,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPortfolio();
  }, [sendRequest, portfolioId, setFormData]);

  const portfolioUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/portfolios/${portfolioId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          image: formState.inputs.image.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/" + auth.userId + "/portfolios/" + portfolioId);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPortfolio && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find portfolio!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPortfolio && (
        <form
          className="portfolio-form"
          onSubmit={portfolioUpdateSubmitHandler}
        >
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={loadedPortfolio.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(0)]}
            onInput={inputHandler}
            initialValue={loadedPortfolio.description}
            initialValid={true}
          />
          <Input
            id="image"
            element="textarea"
            label="Image"
            validators={[VALIDATOR_MINLENGTH(0)]}
            onInput={inputHandler}
            initialValue={loadedPortfolio.image}
            initialValid={true}
          />
          {loadedPortfolio.components.map((component) => {
            <>
              <Input
                id="c1title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={component.title}
                initialValid={true}
              />
              <Input
                id="c1description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(0)]}
                onInput={inputHandler}
                initialValue={component.description}
                initialValid={true}
              />
              <Input
                id="c1image"
                element="textarea"
                label="Image"
                validators={[VALIDATOR_MINLENGTH(0)]}
                onInput={inputHandler}
                initialValue={component.image}
                initialValid={true}
              />
            </>;
            {
              component.components.map((component) => {
                <>
                  <Input
                    id="c2title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                    initialValue={component.title}
                    initialValid={true}
                  />
                  <Input
                    id="c2description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(0)]}
                    onInput={inputHandler}
                    initialValue={component.description}
                    initialValid={true}
                  />
                  <Input
                    id="c2image"
                    element="textarea"
                    label="Image"
                    validators={[VALIDATOR_MINLENGTH(0)]}
                    onInput={inputHandler}
                    initialValue={component.image}
                    initialValid={true}
                  />  
                </>;
              });
            }
          })}
          <Button type="submit" disabled={!formState.isValid}>
            Update Portfolio
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePortfolio;
