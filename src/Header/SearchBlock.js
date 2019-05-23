import styled from "styled-components";
import React from "react";
import FilmList from "../UI/FilmList";
import Search from "./Search";
import variables from "../variables";

const SearchBlockStructure = ({
  searchValue,
  searching,
  searchFilms,
  enableSearching,
  disableSearching,
  changeSearchValue,
  matchFilms,
  className,
  nightmode,
  genres,
  toggleFilmToFav,
  favorites,
  loading
}) => {
  return (
    <div className={className}>
      {searching && searchValue && !loading ? (
        <div className="overlay" onClick={disableSearching} />
      ) : null}
      <div className="wrapper">
        <Search
          placeholder="Find a movie..."
          value={searchValue}
          onChange={event => {
            changeSearchValue(event);
            setTimeout(() => searchFilms(), 0);
          }}
          onClick={enableSearching}
          onKeyDown={e => {
            if (e.keyCode === 27) {
              disableSearching();
              e.target.blur();
            }
          }}
          type="text"
          nightmode={nightmode}
        />
        {searching && searchValue ? (
          <button
            className="closeButton"
            type="button"
            onClick={disableSearching}
          >
            Close
          </button>
        ) : null}
        {searching && matchFilms ? (
          <FilmList
            matchFilms={matchFilms}
            nightmode={nightmode}
            genres={genres}
            toggleFilmToFav={toggleFilmToFav}
            favorites={favorites}
          />
        ) : null}
      </div>
    </div>
  );
};

const SearchBlock = styled(SearchBlockStructure)`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  z-index: 2;

  & .overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    background: rgba(0, 0, 0, 0.3);
  }

  & .wrapper {
    position: relative;
    z-index: 2;
  }

  & .closeButton {
    position: absolute;
    right: 10px;
    top: 5px;
    height: 30px;
    width: 30px;
    border: none;
    background: transparent;
    font-size: 0;
    cursor: pointer;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 13px;
      right: 0px;
      width: 26px;
      height: 5px;
      border-radius: 1px;
      background-color: ${props =>
        props.nightmode ? variables.fontColorLight : variables.fontColorDark};
      transform: rotate(-45deg);
    }

    &::after {
      transform: rotate(45deg);
    }
  }

  & ul {
    overflow-y: scroll;
    position: absolute;
    top: 100%;
    right: 0;
  }

  @media (min-width: ${variables.widthM}) {
    width: 60%;

    & .closeButton {
      top: 7px;
    }
  }

  @media (min-width: ${variables.widthL}) {
    width: 45%;
    margin-top: auto;
    margin-bottom: auto;

    & .closeButton {
      top: 10px;
    }
  }
`;

export default SearchBlock;
