import React from "react";
import styled from "styled-components";
import FilmList from "../UI/FilmList";
import variables from "../variables";

const FavoritesStructure = ({
  favorites,
  toggleFilmToFav,
  nightmode,
  className
}) => {
  return (
    <section className={className}>
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        <FilmList
          nightmode={nightmode}
          matchFilms={favorites}
          toggleFilmToFav={toggleFilmToFav}
          favorites={favorites}
        />
      ) : (
        <p className="info-message">Favorites is empty</p>
      )}
    </section>
  );
};

const Favorites = styled(FavoritesStructure)`
  width: 100%;
  position: relative;

  & h2 {
    text-align: center;
    margin: 15px 0;
  }

  & ul {
    max-height: 360px;
    overflow-y: scroll;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    flex-shrink: 0;
    padding: 0;
    box-shadow: none;
    border: 2px solid
      ${props =>
        props.nightmode ? variables.fontColorLight : variables.fontColorDark};

    & li:last-child {
      border-bottom: none;
    }
  }

  & .info-message {
    text-align: center;
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

    &::after {
      left: -${(20 / 60) * 100}%;
      right: -${(20 / 60) * 100}%;
    }
  }

  @media (min-width: ${variables.widthL}) {
    order: 2;
    width: 45%;

    &::after {
      top: 0;
      bottom: 0;
      right: auto;
      left: calc(-${(5 / 45) * 100}% - 1px);
      width: 2px;
      height: auto;
    }
  }
`;

export default Favorites;
