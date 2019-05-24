import React from "react";
import styled from "styled-components";
import SearchBlock from "./SearchBlock";
import ButtonsBlock from "../UI/ButtonsBlock";
import Button from "../UI/Button";
import Menu from "./Menu";
import variables from "../variables";

const HeaderStructure = ({
  searchValue,
  searching,
  enableSearching,
  disableSearching,
  changeSearchValue,
  searchFilms,
  matchFilms,
  menuIsOpen,
  openedMenuName,
  toggleMenu,
  toggleNightMode,
  nightModeIsOn,
  genres,
  toggleGenre,
  sortingOptions,
  sortBy,
  toggleSorting,
  direction,
  toggleDirection,
  userAuthorized,
  userAvatar,
  defaultAvatar,
  userName,
  defaultName,
  className,
  toggleFilmToFav,
  favorites,
  getFilteredMovies,
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
      <ButtonsBlock>
        <Button
          name="Filters"
          onClick={toggleMenu}
          nightmode={nightModeIsOn}
          menuIsOpen={menuIsOpen}
          openedMenuName={openedMenuName}
        >
          Filters
        </Button>
        <Button
          name="Profile"
          onClick={toggleMenu}
          nightmode={nightModeIsOn}
          menuIsOpen={menuIsOpen}
          openedMenuName={openedMenuName}
        >
          Profile
        </Button>
        <Button
          name="Night mode"
          onClick={toggleNightMode}
          nightmode={nightModeIsOn}
        />
      </ButtonsBlock>
      <Menu
        menuIsOpen={menuIsOpen}
        openedMenuName={openedMenuName}
        genres={genres}
        toggleGenre={toggleGenre}
        sortBy={sortBy}
        sortingOptions={sortingOptions}
        toggleSorting={toggleSorting}
        direction={direction}
        toggleDirection={toggleDirection}
        userAuthorized={userAuthorized}
        userAvatar={userAvatar}
        defaultAvatar={defaultAvatar}
        userName={userName}
        defaultName={defaultName}
        nightmode={nightModeIsOn}
        favorites={favorites}
        toggleFilmToFav={toggleFilmToFav}
        getFilteredMovies={getFilteredMovies}
      />
    </header>
  );
};

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
      /* margin-bottom: 15px; */
    }

    & > div:nth-child(3) {
      order: 1;
      margin-top: auto;
      margin-bottom: 15px;
    }
  }
`;

export default MainHeader;
