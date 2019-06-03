import styled from "styled-components";
import React from "react";
import FilmCard from "./FilmCard";
import variables from "../utilities/variables";
import { debounce } from "lodash";

const FilmListStructure = React.forwardRef(
  (
    {
      matchFilms,
      className,
      nightmode,
      genres,
      toggleFilmToFav,
      favorites,
      autoLoading,
      autoLoadingFunction
    },
    ref
  ) => {
    const debouncedAutoLoading = autoLoading
      ? debounce(autoLoading, 500)
      : null;
    return (
      <ul
        ref={ref}
        className={className}
        onScroll={event => {
          event.persist();
          if (autoLoading)
            debouncedAutoLoading(event.target, autoLoadingFunction);
        }}
      >
        {matchFilms.map(film => (
          <FilmCard
            key={film.id}
            id={film.id}
            title={film.title}
            poster_path={film.poster_path}
            nightmode={nightmode}
            release_date={film.release_date}
            vote_average={film.vote_average}
            vote_count={film.vote_count}
            genres_ids={film.genre_ids}
            genres={genres}
            genresOfFilm={film.genresOfFilm}
            toggleFilmToFav={toggleFilmToFav}
            favorites={favorites}
          />
        ))}
      </ul>
    );
  }
);

const FilmList = styled(FilmListStructure)`
  width: 100%;
  overflow-y: scroll;
  box-shadow: none;
  border: 2px solid
    ${props =>
      props.nightmode ? variables.fontColorLight : variables.fontColorDark};
  max-height: 600px;
  background-color: ${props =>
    props.nightmode
      ? variables.backgroundColorDark
      : variables.backgroundColorLight};
  color: ${props =>
    props.nightmode ? variables.fontColorLight : variables.fontColorDark};
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: -1px 2px 3px 0
    ${props =>
      props.nightmode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.4)"};

  & li:last-child {
    border-bottom: none;
  }
`;

export default FilmList;
