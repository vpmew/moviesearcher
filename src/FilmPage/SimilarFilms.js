import React from "react";
import styled from "styled-components";
import FilmList from "../UI/FilmList";
import variables from "../utilities/variables";

const SimilarFilmsStructure = React.forwardRef(
  (
    {
      similarFilms,
      toggleFilmToFav,
      nightmode,
      favorites,
      className,
      id,
      prevId,
      genres,
      getSimilarFilms,
      autoLoading
    },
    ref
  ) => {
    return (
      <section className={className}>
        <h2>Similar films</h2>
        <FilmList
          ref={ref}
          nightmode={nightmode}
          matchFilms={similarFilms}
          toggleFilmToFav={toggleFilmToFav}
          favorites={favorites}
          genres={genres}
          autoLoading={autoLoading}
          autoLoadingFunction={() => getSimilarFilms(id, prevId)}
        />
      </section>
    );
  }
);

const SimilarFilms = styled(SimilarFilmsStructure)`
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
