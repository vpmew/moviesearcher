import styled from "styled-components";
import React from "react";
import img404 from "../img/img404.jpg";
import variables from "../utilities/variables";
import heartIcoLight from "../img/heart-off-light.svg";
import heartIcoDark from "../img/heart-off-dark.svg";
import heartIcoActive from "../img/heart-on.svg";
import { Link } from "react-router-dom";

const FilmCardStructure = ({
  id,
  title,
  poster_path,
  className,
  release_date,
  vote_average,
  vote_count,
  genres_ids,
  genres,
  genresOfFilm: genresFromFav,
  toggleFilmToFav
}) => {
  let viewWidth = document.documentElement.clientWidth;
  let releaseDate, year;
  let titleSymbolRestriction =
    viewWidth <= Number.parseInt(variables.widthM)
      ? 35
      : viewWidth <= Number.parseInt(variables.widthL)
      ? 40
      : 45;
  let genresSymbolRestriction =
    viewWidth <= Number.parseInt(variables.widthM)
      ? 40
      : viewWidth <= Number.parseInt(variables.widthL)
      ? 60
      : 65;
  if (release_date) {
    releaseDate = new Date(release_date);
    year = releaseDate.getFullYear();
  }

  let genresOfFilm = [];
  if (genresFromFav) {
    genresOfFilm = genresFromFav.split(", ");
  } else if (genres_ids) {
    for (let key in genres) {
      if (~genres_ids.indexOf(genres[key].id)) {
        genresOfFilm = [...genresOfFilm, String(key)];
      }
    }
  }

  if (genresOfFilm.join(", ").length > genresSymbolRestriction) {
    genresOfFilm =
      genresOfFilm.join(", ").slice(0, genresSymbolRestriction - 3) + "...";
  } else {
    genresOfFilm = genresOfFilm.join(", ");
  }

  let croppedTitle = null;
  if (title.length > titleSymbolRestriction) {
    croppedTitle = title.slice(0, titleSymbolRestriction - 3) + "...";
  }

  return (
    <li className={className}>
      <div className="poster">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w400/${poster_path}`
              : img404
          }
          alt={title}
        />
      </div>
      <p>
        {title ? (
          <Link to={`/filmpage/${id}`}>
            <span className="title">{croppedTitle ? croppedTitle : title}</span>
          </Link>
        ) : (
          "No Title"
        )}
        {genresOfFilm.length > 0 ? (
          <span className="genres">{genresOfFilm}</span>
        ) : null}
        {release_date ? (
          <time className="date" dateTime={release_date}>
            {year}
          </time>
        ) : null}
        <span className="wrapper">
          {vote_average ? (
            <span className="vote-avg">
              {String(vote_average).length === 1
                ? [...String(vote_average).split(""), ".", "0"].join("")
                : vote_average}
            </span>
          ) : null}
          {vote_count ? (
            <span className="vote-count">({vote_count} votes)</span>
          ) : null}
        </span>
      </p>
      <button
        className="toFav"
        onClick={() => {
          toggleFilmToFav({
            id,
            poster_path,
            title,
            release_date,
            vote_average,
            vote_count,
            genresOfFilm
          });
        }}
      />
    </li>
  );
};

const FilmCard = styled(FilmCardStructure)`
  position: relative;
  width: 100%;
  height: 120px;
  display: flex;
  flex-shrink: 0;
  border-bottom: 2px solid
    ${props =>
      props.nightmode ? variables.fontColorLight : variables.fontColorDark};

  & .poster {
    width: 25%;
    overflow: hidden;
    background-image: ${props =>
      props.poster_path
        ? `url(https://image.tmdb.org/t/p/w400/${props.poster_path})`
        : `url(${img404})`};
    background-repeat: no-repeat;
    background-size: cover;

    & img {
      display: none;
      width: 100%;
      height: auto;
    }
  }

  & p {
    position: relative;
    width: 75%;
    max-height: 100%;
    overflow: hidden;
    display: flex;
    flex-flow: column wrap;
    flex-grow: 1;
    align-self: stretch;
    margin: 0;

    & a {
      width: calc(100% - 40px);
      padding-left: 10px;
      padding-top: 5px;
      color: inherit;
      font-size: 1.2em;
      font-weight: bold;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
      max-height: 40%;
    }

    & .genres {
      font-style: italic;
      width: 80%;
      padding-left: 10px;
      padding-right: 10px;
      font-size: 0.9em;
      max-height: 40%;
    }

    & .date {
      padding-left: 10px;
      max-height: 20%;
    }

    & .wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      & .vote-avg {
        background-color: ${props =>
          props.nightmode ? "transparent" : variables.fontColorDark};
        font-size: 1.8em;
        padding: 5px;
        color: ${props =>
          props.vote_average >= 7
            ? "mediumseagreen"
            : props.vote_average >= 5
            ? "#f3f300"
            : props.vote_average >= 3
            ? "orange"
            : "orangered"};
      }

      & .vote-count {
        margin-left: 10px;
        align-self: flex-end;
        font-size: 0.7em;
      }
    }
  }

  & .toFav {
    position: absolute;
    content: "";
    right: 0;
    top: 0;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    background-repeat: no-repeat;
    background-size: 50% 50%;
    background-position: 50% 50%;
    background-color: transparent;
    background-image: ${props =>
      props.favorites.some(film => Number(film.id) === Number(props.id))
        ? `url(${heartIcoActive})`
        : props.nightmode
        ? `url(${heartIcoLight})`
        : `url(${heartIcoDark})`};
    cursor: pointer;
    &:hover {
      background-size: 60% 60%;
      opacity: ${props =>
        props.favorites.some(film => Number(film.id) === Number(props.id))
          ? "0.5"
          : "1"};
    }
  }

  @media (min-width: ${variables.widthM}) {
    height: 120px;

    & p {
      & a {
        width: calc(100% - 50px);
        font-size: 0.9em;
        line-height: 1.2em;
      }

      & .genres {
        padding-top: 5px;
        font-size: 0.7em;
        line-height: 1.2em;
      }

      & .date {
        padding-top: 5px;
        font-size: 0.7em;
        line-height: 1.2em;
      }

      & .wrapper {
        & .vote-avg {
          font-size: 1.6em;
        }

        & .vote-count {
          font-size: 0.5em;
        }
      }
    }
    & .toFav {
      width: 50px;
      height: 50px;
      background-size: 70% 70%;
      background-position: 50% 50%;
      &:hover {
        background-size: 80% 80%;
      }
    }
  }
`;

export default FilmCard;
