import React from "react";
import styled from "styled-components";
import BestFilms from "./BestFilms";
import FilteredFilms from "./FilteredFilms";
import variables from "../utilities/variables";
import StateContext from "../StateContext";

const MainStructure = ({ className }) => (
  <StateContext.Consumer>
    {({
      filteredMovies,
      bestMovies,
      openedMenuName,
      menuIsOpen,
      nightModeIsOn
    }) =>
      (filteredMovies.length > 0 || bestMovies.length > 0) &&
      !(openedMenuName === "Profile" && menuIsOpen) && (
        <main className={className}>
          {filteredMovies.length < 1 ? null : openedMenuName === "Profile" &&
            menuIsOpen ? null : (
            <FilteredFilms nightmode={nightModeIsOn} />
          )}
          {bestMovies.length < 1 ? null : openedMenuName === "Profile" &&
            menuIsOpen ? null : (
            <BestFilms nightmode={nightModeIsOn} />
          )}
        </main>
      )
    }
  </StateContext.Consumer>
);

const Main = styled(MainStructure)`
  position: relative;
  padding-top: 20px;

  @media (min-width: ${variables.widthL}) {
    display: flex;
    flex-flow: row wrap;
    justify-content: ${props =>
      props.filteredMovies.length !== 0 ? "space-between" : "center"};
    &::after {
      content: "";
      position: absolute;
      height: 2px;
      left: 0;
      right: 0;
      top: 0;
      background-color: lightgrey;
    }
  }
`;

export default Main;
