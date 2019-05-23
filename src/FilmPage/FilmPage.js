import React from "react";
import styled from "styled-components";
import img404 from "../img/img404.jpg";
import variables from "../variables";
import heartIcoLight from "../img/heart-off-light.svg";
import heartIcoDark from "../img/heart-off-dark.svg";
import heartIcoActive from "../img/heart-on.svg";
import InfoMessage from "../UI/InfoMessage";
import SimilarFilms from "./SimilarFilms";
import Helmet from "react-helmet";

class FilmPageStructure extends React.Component {
  componentDidMount() {
    this.props.loadFilmData(Number(this.props.location.pathname.slice(11)));
    this.props.getSimilarFilms(Number(this.props.location.pathname.slice(11)));
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   let result;
  //   if (this.props.location.pathname !== nextProps.location.pathname) {
  //     result = true;
  //     console.log(result);
  //     return result;
  //   }
  //   result = false;
  //   console.log(result);
  //   return result;
  // }

  componentDidUpdate(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.loadFilmData(Number(this.props.location.pathname.slice(11)));
      this.props.getSimilarFilms(
        Number(this.props.location.pathname.slice(11))
      );
    }
  }

  render() {
    let {
      toggleFilmToFav,
      nightmode,
      favorites,
      genres,
      className,
      similarFilms,
      getMoreSimilarFilms,
      filmData
    } = this.props;
    let convertRuntime = runtime => {
      if (runtime < 60) {
        let str = runtime + " minutes.";
        return str;
      } else {
        let hours = Math.floor(runtime / 60);
        let minutes = runtime % 60;
        let str = `${hours} ${
          hours > 1 ? "hours" : "hour"
        } ${minutes} minutes.`;
        return str;
      }
    };

    let convertDate = date => {
      let day = date.getDay();
      let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      let month = months[date.getMonth()];
      let year = date.getFullYear();
      let str = `${month} ${day}, ${year}`;
      return str;
    };

    let convertMoney = amount => {
      let symbols = String(amount)
        .split("")
        .reverse();
      symbols = symbols.map((s, i, arr) => {
        if (!((i + 1) % 3) && i + 1 !== arr.length) {
          return " " + s;
        } else return s;
      });
      let str = symbols.reverse().join("");
      return str;
    };

    let genresList =
      filmData.genres && filmData.genres.map(genre => genre.name).join(", ");
    let releaseDate =
      filmData.release_date && convertDate(new Date(filmData.release_date));
    let countries =
      filmData.production_countries &&
      filmData.production_countries.map(country => country.name).join(", ");
    let companies =
      filmData.production_companies &&
      filmData.production_companies.map(comp => comp.name).join(", ");
    let budget = filmData.budget && convertMoney(filmData.budget);
    let revenue = filmData.revenue && convertMoney(filmData.revenue);
    let homepage = filmData.homepage;
    let runtime = filmData.runtime && convertRuntime(filmData.runtime);
    let tagline = filmData.tagline;
    let voteAverage =
      String(filmData.vote_average).length === 1
        ? [...String(filmData.vote_average).split(""), ".", "0"].join("")
        : filmData.vote_average;
    let voteCount = filmData.vote_count;

    return filmData ? (
      <main className={className}>
        <Helmet title={this.props.filmData.title} />
        <h2 className="title">{filmData.title || "No title."}</h2>
        {tagline && <p className="tagline">{tagline}</p>}
        <div className="poster-block">
          <img
            className="image"
            src={
              filmData.poster_path
                ? `https://image.tmdb.org/t/p/w400/${filmData.poster_path}`
                : img404
            }
            alt={filmData.title || "No title."}
          />
          <div className="wrapper">
            {voteAverage && <p className="vote-avg">{voteAverage}</p>}
            {voteCount && <p className="vote-count">{voteCount} votes</p>}
          </div>
          <div className="widgets">
            <button
              className="toFav"
              value={JSON.stringify({
                id: filmData.id,
                poster_path: filmData.poster_path,
                title: filmData.title,
                release_date: filmData.release_date,
                vote_average: filmData.vote_average,
                vote_count: filmData.vote_count,
                genresOfFilm: genresList
              })}
              onClick={toggleFilmToFav}
            />
            <InfoMessage color="orangered" width="75%">
              Estimating is unavailable at the moment.
            </InfoMessage>
          </div>
        </div>
        <div className="additional-info">
          {filmData.overview && <p className="overview">{filmData.overview}</p>}
          {genresList && (
            <p className="genres">
              <span className="option-name">Genres:</span> {genresList}.
            </p>
          )}
          {runtime && (
            <p className="runtime">
              <span className="option-name">Runtime:</span> {runtime}
            </p>
          )}
          {releaseDate && (
            <time className="date" dateTime={filmData.release_date}>
              <span className="option-name">Release date:</span> {releaseDate}.
            </time>
          )}
          {countries && (
            <p className="counries">
              <span className="option-name">Counries:</span> {countries}.
            </p>
          )}
          {companies && (
            <p className="companies">
              <span className="option-name">Companies:</span> {companies}.
            </p>
          )}
          {Boolean(budget) && (
            <p className="budget">
              <span className="option-name">Budget:</span> ${budget}.
            </p>
          )}
          {Boolean(revenue) && (
            <p className="revenue">
              <span className="option-name">Revenue:</span> ${revenue}.
            </p>
          )}
          {homepage && (
            <p className="homepage">
              <span className="option-name">Homepage:</span>{" "}
              <a href={`${homepage}`}>Link</a>
            </p>
          )}
        </div>
        {similarFilms.length > 0 && (
          <SimilarFilms
            id={filmData.id}
            similarFilms={similarFilms}
            toggleFilmToFav={toggleFilmToFav}
            nightmode={nightmode}
            genres={genres}
            favorites={favorites}
            getMoreSimilarFilms={getMoreSimilarFilms}
          />
        )}
      </main>
    ) : null;
  }
}

const FilmPage = styled(FilmPageStructure)`
  & .image {
    display: block;
    width: 100%;
    height: auto;
  }

  & .poster-block {
    position: relative;

    & .wrapper {
      position: absolute;
      right: 0;
      top: 5%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 5px;
      background-color: ${props =>
        props.nightmode
          ? variables.backgroundColorDark
          : variables.fontColorDark};

      & .vote-avg {
        margin: 0;
        margin-bottom: 10px;
        font-size: 2em;
        color: ${props =>
          props.filmData.vote_average >= 7
            ? "mediumseagreen"
            : props.filmData.vote_average >= 5
            ? "#f3f300"
            : props.filmData.vote_average >= 3
            ? "orange"
            : "orangered"};
      }

      & .vote-count {
        margin: 0;
        align-self: flex-end;
        color: ${props =>
          props.nightmode
            ? variables.fontColorLight
            : variables.backgroundColorLight};
        font-size: 1em;
      }

      &:hover {
        opacity: 0.2;
      }
    }
  }

  & .tagline {
    margin-top: 0;
    width: 100%;
    position: relative;
    font-style: italic;
    padding-left: 10px;

    &::after {
      content: "";
      position: absolute;
      width: 2px;
      left: 0;
      top: 0;
      bottom: 0;
      background-color: ${props =>
        props.nightmode ? variables.fontColorLight : variables.fontColorDark};
    }
  }

  & .option-name {
    font-weight: bold;
  }

  & .overview {
    &::first-letter {
      font-size: 1.4em;
    }
  }

  & .homepage {
    & a {
      color: inherit;
      &:hover {
        text-decoration: none;
      }
    }
  }

  & .widgets {
    display: flex;
    flex-flow: row wrap;

    & .toFav {
      width: 25%;
      height: auto;
      padding: 0;
      border: none;
      background-repeat: no-repeat;
      background-size: 80% 80%;
      background-position: 50% 50%;
      background-color: transparent;
      background-image: ${props =>
        props.favorites.some(
          film => Number(film.id) === Number(props.filmData.id)
        )
          ? `url(${heartIcoActive})`
          : props.nightmode
          ? `url(${heartIcoLight})`
          : `url(${heartIcoDark})`};
      cursor: pointer;
      &:hover {
        background-size: 90% 90%;
        opacity: ${props =>
          props.favorites.some(
            film => Number(film.id) === Number(props.filmData.id)
          )
            ? "0.5"
            : "1"};
      }
    }
  }

  @media (min-width: ${variables.widthM}) {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    & .title {
      width: 100%;
    }

    & .poster-block {
      width: 45%;
    }

    & .overview {
      margin-top: 0;
    }

    & .additional-info {
      width: 50%;
    }

    & .widgets {
      & p {
        font-size: 0.8em;
      }

      & .toFav {
        background-size: 70% 70%;
        &:hover {
          background-size: 80% 80%;
        }
      }
    }
  }
`;

export default FilmPage;
