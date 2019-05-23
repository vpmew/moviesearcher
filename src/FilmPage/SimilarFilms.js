import React from "react";
import styled from "styled-components";
import FilmList from "../UI/FilmList";
import Button from "../UI/Button";
import variables from "../variables";

const SimilarFilmsStructure = ({
  similarFilms,
  toggleFilmToFav,
  nightmode,
  favorites,
  className,
  loadFilmData,
  id,
  genres,
  getMoreSimilarFilms,
  getSimilarFilms
}) => {
  return (
    <section className={className}>
      <h2>Similar films</h2>
      <FilmList
        nightmode={nightmode}
        matchFilms={similarFilms}
        toggleFilmToFav={toggleFilmToFav}
        favorites={favorites}
        loadFilmData={loadFilmData}
        genres={genres}
        getSimilarFilms={getSimilarFilms}
      />
      <Button nightmode={nightmode} onClick={() => getMoreSimilarFilms(id)}>
        Load more
      </Button>
    </section>
  );
};

const SimilarFilms = styled(SimilarFilmsStructure)`
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
    margin: 20px auto 0;
    margin-bottom: 30px;

    &::after {
      left: -${(20 / 60) * 100}%;
      right: -${(20 / 60) * 100}%;
    }
  }

  @media (min-width: ${variables.widthL}) {
    width: 45%;
    margin: 30px auto 30px;

    &::after {
      left: -${(55 / 2 / 45) * 100}%;
      right: -${(55 / 2 / 45) * 100}%;
    }
  }
`;

export default SimilarFilms;
