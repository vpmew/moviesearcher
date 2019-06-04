import React from "react";
import styled from "styled-components";
import img404 from "../img/img404.jpg";
import variables from "../utilities/variables";
import InfoMessage from "../UI/InfoMessage";
import SimilarFilms from "./SimilarFilms";
import Rating from "./Rating";
import Tagline from "./Tagline";
import FavButton from "./FavButton";
import StateContext from "../StateContext";

// const ref = React.createRef();

class FilmPageStructure extends React.Component {
  static contextType = StateContext;

  ref = React.createRef();

  componentDidMount() {
    window.scrollTo(0, 0);
    this.context.methods.loadFilmData(
      Number(this.props.location.pathname.slice(10))
    );
    this.context.methods.getSimilarFilms(
      Number(this.props.location.pathname.slice(10)),
      this.context.filmData.id
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
      // console.log(this.ref);
      this.ref.current.scrollTop = 0;
      this.context.methods.loadFilmData(
        Number(this.props.location.pathname.slice(10))
      );
      this.context.methods.getSimilarFilms(
        Number(this.props.location.pathname.slice(10))
      );
    }
  }

  render() {
    let { className } = this.props;
    let {
      filmData,
      loading,
      nightModeIsOn,
      favorites,
      similarFilms,
      genres,
      methods
    } = this.context;

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
    let voteAverage, voteCount;
    if (filmData.vote_average) {
      voteAverage =
        String(filmData.vote_average).length === 1
          ? [...String(filmData.vote_average).split(""), ".", "0"].join("")
          : filmData.vote_average;
      voteCount = filmData.vote_count;
    }

    return (filmData && !loading) ? (
      <main className={className}>
        <h2 className="title">{filmData.title || "No title."}</h2>
        {tagline && <Tagline nightmode={nightModeIsOn}>{tagline}</Tagline>}
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
          {voteAverage && (
            <Rating
              voteAverage={voteAverage}
              voteCount={voteCount}
              nightmode={nightModeIsOn}
            />
          )}
          <div className="widgets">
            <FavButton
              onClick={() => {
                methods.toggleFilmToFav({
                  id: filmData.id,
                  poster_path: filmData.poster_path,
                  title: filmData.title,
                  release_date: filmData.release_date,
                  vote_average: filmData.vote_average,
                  vote_count: filmData.vote_count,
                  genresOfFilm: genresList
                });
              }}
              favorites={favorites}
              filmData={filmData}
              nightmode={nightModeIsOn}
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
            ref={this.ref}
            id={Number(this.props.location.pathname.slice(10))}
            prevId={filmData.id}
            similarFilms={similarFilms}
            toggleFilmToFav={methods.toggleFilmToFav}
            nightmode={nightModeIsOn}
            genres={genres}
            favorites={favorites}
            getSimilarFilms={methods.getSimilarFilms}
            autoLoading={methods.autoLoading}
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
    }
  }
`;

export default FilmPage;
