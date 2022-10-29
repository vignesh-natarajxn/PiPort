import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PortfolioForm.css";

const DUMMY_PORTFOLIOS = [
  {
    id: "u1r1",
    creator: "u1",
    title: "Software Development Engineer",
    description: "I like to type stuff.",
    imageUrl:
      "https://cutewallpaper.org/22/minimal-programming-wallpapers/930213660.jpg",
    components: [
      {
        title: "",
        description: "",
        image: "",
      },
    ],
  },
  {
    id: "u1r2",
    creator: "u1",
    title: "Embedded Firmware Developer",
    description: "I give life to computers.",
    imageUrl: "https://cdn.wallpapersafari.com/23/71/Ow4QZ5.png",
    components: [
      {
        title: "",
        description: "",
        image: "",
      },
    ],
  },
  {
    id: "u2r1",
    creator: "u2",
    title: "Chief Executive Officer - Earth",
    description: "I am your creator.",
    imageUrl:
      "https://www.nasa.gov/sites/default/files/styles/full_width/public/thumbnails/image/web_first_images_release.png?itok=g21NrdRw",
    components: [
      {
        title: "",
        description: "",
        image: "",
      },
    ],
  },
];

const UpdatePortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const portfolioId = useParams().portfolioId;

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
    },
    false
  );

  const identifiedPortfolio = DUMMY_PORTFOLIOS.find(
    (p) => p.id === portfolioId
  );

  useEffect(() => {
    if (identifiedPortfolio) {
      setFormData(
        {
          title: {
            value: identifiedPortfolio.title,
            isValid: true,
          },
          description: {
            value: identifiedPortfolio.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPortfolio]);

  const portfolioUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPortfolio) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find portfolio!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        Portfolio
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="portfolio-form" onSubmit={portfolioUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update
      </Button>
    </form>
  );
};

export default UpdatePortfolio;
