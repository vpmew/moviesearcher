import React from "react";
import styled from "styled-components";
import SearchBlock from "./SearchBlock";
import ButtonsBlock from "../UI/ButtonsBlock";
import Button from "../UI/Button";
import Menu from "./Menu";

const HeaderStructure = ({
  searchValue,
  searching,
  toggleSearching,
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
  favorites
}) => {
  return (
    <header className={className}>
      <h1>Moviesearcher v1.0.0</h1>
      <SearchBlock
        searchValue={searchValue}
        searching={searching}
        toggleSearching={toggleSearching}
        changeSearchValue={changeSearchValue}
        searchFilms={searchFilms}
        matchFilms={matchFilms}
        nightmode={nightModeIsOn}
        genres={genres}
        toggleFilmToFav={toggleFilmToFav}
        favorites={favorites}
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
      />
    </header>
  );
};

const Header = styled(HeaderStructure)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & h1 {
    width: 100%;
  }
`;

export default Header;
