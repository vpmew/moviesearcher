import React from "react";
import styled from "styled-components";
import SearchBlock from "./SearchBlock";
import ButtonsBlock from "../UI/ButtonsBlock";
import Button from "../UI/Button";
import Menu from "./Menu";
import variables from "../utilities/variables";

import StateContext from "../StateContext";

const HeaderStructure = ({ className }) => (
  <StateContext.Consumer>
    {({
      nightModeIsOn,
      menuIsOpen,
      openedMenuName,
      searching,
      searchValue,
      loading,
      matchFilms,
      direction,
      genres,
      favorites,
      methods
    }) => (
      <header className={className}>
        <h1>Moviesearcher</h1>
        <SearchBlock
          searching={searching}
          searchValue={searchValue}
          loading={loading}
          nightmode={nightModeIsOn}
          matchFilms={matchFilms}
          genres={genres}
          favorites={favorites}
          methods={methods}
        />
        <ButtonsBlock>
          <Button
            name="Filters"
            onClick={methods.toggleMenu}
            nightmode={nightModeIsOn}
            menuIsOpen={menuIsOpen}
            openedMenuName={openedMenuName}
          >
            Filters
          </Button>
          <Button
            name="Profile"
            onClick={methods.toggleMenu}
            nightmode={nightModeIsOn}
            menuIsOpen={menuIsOpen}
            openedMenuName={openedMenuName}
          >
            Profile
          </Button>
          <Button
            name="Night mode"
            onClick={methods.toggleNightMode}
            nightmode={nightModeIsOn}
          />
        </ButtonsBlock>
        <Menu
          menuIsOpen={menuIsOpen}
          openedMenuName={openedMenuName}
          nightmode={nightModeIsOn}
          direction={direction}
        />
      </header>
    )}
  </StateContext.Consumer>
);

const MainHeader = styled(HeaderStructure)`
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
  }

  @media (min-width: ${variables.widthL}) {
    padding-bottom: 30px;
    padding-top: 30px;

    & h1 {
      margin: 0;
      font-size: 1.8em;
      width: 45%;
      margin-top: 30px;
    }

    & > div:nth-child(2) {
      order: 2;
      margin-top: -17px;
      margin-left: auto;
    }

    & > div:nth-child(3) {
      order: 1;
      margin-top: auto;
      margin-bottom: 15px;
    }
  }
`;

export default MainHeader;
