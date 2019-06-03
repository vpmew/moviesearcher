import styled from "styled-components";
import React from "react";
import FilmList from "../UI/FilmList";
import Search from "./Search";
import variables from "../utilities/variables";

const SearchBlockStructure = ({
  className,
  searching,
  searchValue,
  loading,
  nightmode,
  matchFilms,
  genres,
  favorites,
  methods
}) => {
  let _input;
  return (
    <div className={className}>
      {searching && searchValue && !loading ? (
        <div className="overlay" onClick={methods.disableSearching} />
      ) : null}
      <div className="wrapper">
        <Search
          placeholder="Find a movie..."
          value={searchValue}
          ref={input => (_input = input)}
          onChange={event => {
            methods.changeSearchValue(event);
            setTimeout(() => methods.searchFilms(), 0);
          }}
          onClick={methods.enableSearching}
          onKeyDown={e => {
            if (e.keyCode === 27) {
              methods.disableSearching();
              e.target.blur();
            }
          }}
          type="text"
          nightmode={nightmode}
        />
        {searching && searchValue ? (
          <button
            className="clearButton"
            type="button"
            onClick={() => methods.clearSearchValue(_input)}
          >
            Clear
          </button>
        ) : null}
        {searching && matchFilms ? (
          <FilmList
            matchFilms={matchFilms}
            nightmode={nightmode}
            genres={genres}
            toggleFilmToFav={methods.toggleFilmToFav}
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

  & .clearButton {
    position: absolute;
    right: 10px;
    top: 5px;
    height: 30px;
    width: 50px;
    border: none;
    background: transparent;
    font-size: inherit;
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
  }

  & ul {
    overflow-y: scroll;
    position: absolute;
    top: 100%;
    right: 0;
  }

  @media (min-width: ${variables.widthM}) {
    width: 60%;

    & .clearButton {
      top: 7px;
      width: 70px;
    }
  }

  @media (min-width: ${variables.widthL}) {
    width: 45%;
    margin-top: auto;
    margin-bottom: auto;

    & .clearButton {
      top: 10px;
    }
  }
`;

export default SearchBlock;

/* <button
    className="closeButton"
    type="button"
    onClick={toggleSearching}
  >
    Close
  </button> */

/* & .closeButton {
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
  } */
