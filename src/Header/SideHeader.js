import React from "react";
import styled from "styled-components";
import ButtonsBlock from "../UI/ButtonsBlock";
import Button from "../UI/Button";
import SearchBlock from "./SearchBlock";
import { Link } from "react-router-dom";
import homeIcoLight from "../img/home-ico-light.svg";
import homeIcoDark from "../img/home-ico-dark.svg";
import variables from "../variables";

const HeaderStructure = ({
  searchValue,
  searching,
  matchFilms,
  genres,
  favorites,
  nightModeIsOn,
  toggleNightMode,
  searchFilms,
  changeSearchValue,
  enableSearching,
  disableSearching,
  toggleFilmToFav,
  className,
  loading
}) => {
  return (
    <header className={className}>
      <h1>Moviesearcher</h1>
      <SearchBlock
        searchValue={searchValue}
        searching={searching}
        enableSearching={enableSearching}
        disableSearching={disableSearching}
        changeSearchValue={changeSearchValue}
        searchFilms={searchFilms}
        matchFilms={matchFilms}
        nightmode={nightModeIsOn}
        genres={genres}
        toggleFilmToFav={toggleFilmToFav}
        favorites={favorites}
        loading={loading}
      />
      <ButtonsBlock justify="flex-end">
        <Button
          as={Link}
          name="Main"
          nightmode={nightModeIsOn}
          to="/"
          width="calc(33% / 2)"
          image={nightModeIsOn ? homeIcoLight : homeIcoDark}
        />
        <Button
          name="Night mode"
          onClick={toggleNightMode}
          nightmode={nightModeIsOn}
        />
      </ButtonsBlock>
    </header>
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
