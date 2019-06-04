import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import StateContext from "../StateContext";

const ReloadButton = () => {
  return (
    <StateContext.Consumer>
      {({ nightModeIsOn }) =>
        window.location.pathname === "/" ? (
          <Button
            nightmode={nightModeIsOn}
            width="30%"
            onClick={() => document.location.reload()}
          >
            Reload
          </Button>
        ) : (
          <Button as={Link} nightmode={nightModeIsOn} to="/" width="30%">
            To main
          </Button>
        )
      }
    </StateContext.Consumer>
  );
};

export default ReloadButton;
