import Card from "../../shared/components/UIElements/Card";

import "./Portfolio.css";

const PortfolioComponent = (props) => {
  let component = props.component;

  return (
    <li
      style={{
        paddingTop: "5px",
        paddingBottom: "5px",
      }}
    >
      <Card>
        <div
          style={{
            fontSize: "18pt",
            color: "#ffffff",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          {component.title}
        </div>
        <div
          style={{
            fontSize: "13pt",
            color: "#c9c9c9",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          {component.description}
        </div>
      </Card>
    </li>
  );
};

export default PortfolioComponent;
