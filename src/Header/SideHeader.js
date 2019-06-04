import React from "react";
import styled from "styled-components";
import ButtonsBlock from "../UI/ButtonsBlock";
import Button from "../UI/Button";
import SearchBlock from "./SearchBlock";
import { Link } from "react-router-dom";
import homeIcoLight from "../img/home-ico-light.svg";
import homeIcoDark from "../img/home-ico-dark.svg";
import variables from "../utilities/variables";
import StateContext from "../StateContext";

const HeaderStructure = ({ className }) => {
  return (
    <StateContext.Consumer>
      {({
        nightModeIsOn,
        searching,
        searchValue,
        loading,
        matchFilms,
        genres,
        favorites,
        methods
      }) => (
        <header className={className}>
          <h1>Moviesearcher</h1>
          <SearchBlock
            searchValue={searchValue}
            searching={searching}
            matchFilms={matchFilms}
            nightmode={nightModeIsOn}
            loading={loading}
            genres={genres}
            favorites={favorites}
            methods={methods}
          />
          <ButtonsBlock justify="flex-end">
            <Button
              as={Link}
              name="Main"
              nightmode={nightModeIsOn}
              to="/"
              width="calc(33% / 2)"
              onClick={methods.deleteFilmData}
              image={nightModeIsOn ? homeIcoLight : homeIcoDark}
            />
            <Button
              name="Night mode"
              onClick={methods.toggleNightMode}
              nightmode={nightModeIsOn}
            />
          </ButtonsBlock>
        </header>
      )}
    </StateContext.Consumer>
  );
};

const SideHeader = styled(HeaderStructure)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & h1 {
    width: 100%;
  }

  @media (min-width: ${variables.widthM}) {
    & h1 {
      font-size: 1.6em;
    }

    & button {
      width: 50%;
    }

    & a {
      width: 50%;
    }

    & > div:nth-child(3) {
      width: calc(40% + 4px);
      margin-left: -4px;
    }
  }

  @media (min-width: ${variables.widthL}) {
    padding-top: 30px;

    & h1 {
      font-size: 1.8em;
      width: 50%;
      margin-top: 30px;
      margin-bottom: 0;
    }

    & > div:nth-child(2) {
      order: 2;
      margin-left: auto;
      margin-top: -17px;
    }

    & > div:nth-child(3) {
      order: 1;
      margin-top: auto;
      width: calc(45% + 2px);
      margin-left: -2px;
      margin-bottom: 15px;
    }
  }
`;

export default SideHeader;
