import React from "react";
import styled from "styled-components";
import FilmList from "../UI/FilmList";
import Button from "../UI/Button";
import variables from "../variables";

const FilteredFilmsStructure = ({
  filteredMovies,
  toggleFilmToFav,
  getMoreFilteredMovies,
  nightmode,
  genres,
  favorites,
  className
}) => (
  <section className={className}>
    <h2>Films by filters</h2>
    <FilmList
      nightmode={nightmode}
      matchFilms={filteredMovies}
      toggleFilmToFav={toggleFilmToFav}
      genres={genres}
      favorites={favorites}
    />
    <Button nightmode={nightmode} onClick={getMoreFilteredMovies}>
      Load more
    </Button>
  </section>
);

const FilteredFilms = styled(FilteredFilmsStructure)`
  display: flex;
  flex-flow: row wrap;
  position: relative;
  margin-bottom: 20px;

  & h2 {
    text-align: center;
    width: 100%;
  }

  & ul {
    max-height: 360px;
    overflow-y: scroll;
    border: 2px solid
      ${props =>
        props.nightmode ? variables.fontColorLight : variables.fontColorDark};
    box-shadow: none;

    & li:last-child {
      border-bottom: none;
    }
  }

  & button {
    margin: -2px 0 0 auto;
  }

  &::after {
    content: "";
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    top: 0;
    background-color: lightgrey;
  }

  @media (min-width: ${variables.widthM}) {
    width: 60%;
    margin: 0 auto;
    margin-bottom: 30px;

    &::after {
      left: -${(20 / 60) * 100}%;
      right: -${(20 / 60) * 100}%;
    }
  }

  @media (min-width: ${variables.widthL}) {
    width: 45%;
    margin: 0;
    margin-bottom: 30px;

    &::after {
      top: 0;
      bottom: 0;
      left: auto;
      right: calc(-${(5 / 45) * 100}% - 1px);
      width: 2px;
      height: auto;
    }
  }
`;

export default FilteredFilms;
