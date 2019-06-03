import React from "react";
import styled from "styled-components";
import FilmList from "../UI/FilmList";
import variables from "../utilities/variables";
import StateContext from "../StateContext";

const BestFilmsStructure = ({ className }) => (
  <StateContext.Consumer>
    {({ nightModeIsOn, bestMovies, genres, favorites, methods }) => {
      return (
        <section className={className}>
          <h2>Best films</h2>
          <FilmList
            nightmode={nightModeIsOn}
            matchFilms={bestMovies}
            toggleFilmToFav={methods.toggleFilmToFav}
            genres={genres}
            favorites={favorites}
            autoLoading={methods.autoLoading}
            autoLoadingFunction={methods.getBestMovies}
          />
        </section>
      );
    }}
  </StateContext.Consumer>
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
