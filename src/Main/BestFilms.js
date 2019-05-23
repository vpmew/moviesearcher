import React from "react";
import styled from "styled-components";
import FilmList from "../UI/FilmList";
import Button from "../UI/Button";
import variables from "../variables";

const BestFilmsStructure = ({
  bestMovies,
  toggleFilmToFav,
  getBestMovies,
  nightmode,
  genres,
  favorites,
  className
}) => (
  <section className={className}>
    <h2>Best films</h2>
    <FilmList
      nightmode={nightmode}
      matchFilms={bestMovies}
      toggleFilmToFav={toggleFilmToFav}
      genres={genres}
      favorites={favorites}
    />
    <Button nightmode={nightmode} onClick={getBestMovies}>
      Load more
    </Button>
  </section>
);

const BestFilms = styled(BestFilmsStructure)`
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
      display: none;
    }
  }
`;

export default BestFilms;
