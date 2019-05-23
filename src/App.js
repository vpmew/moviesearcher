import React, { Component } from "react";
import Loading from "./UI/Loading";
import MainHeader from "./Header/MainHeader";
import SideHeader from "./Header/SideHeader";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Body from "./UI/Body";
import WidthContainer from "./UI/WidthContainer";
import FilmPage from "./FilmPage/FilmPage";
import { sortByRelevance } from "./sorting";
import { Route, Switch } from "react-router-dom";
import defaultAvatar from "./img/default-avatar.jpg";
import { debounce } from "lodash";
import Helmet from "react-helmet";

class App extends Component {
  state = {
    loading: true,

    userAuthorized: false,
    userAvatar: null,
    defaultAvatar: defaultAvatar,
    userName: null,
    defaultName: "The Guest",

    genres: null,
    sortingOptions: ["popularity", "votes", "rating", "date"],
    sortBy: "popularity",
    direction: "descending",
    filteredMovies: [],
    filteredMoviesPage: 1,

    bestMovies: [],
    bestMoviesPage: 1,

    searchValue: "",
    searching: false,
    matchFilms: null,

    favorites: [],

    openedMenuName: "",
    menuIsOpen: false,

    nightModeIsOn: false,

    filmData: {},
    similarFilms: [],
    similarFilmsPage: 1
  };

  getGenres = () => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US"
    )
      .then(response => {
        return response.json();
      })
      .then(({ genres }) => {
        let reducedGenres = genres.reduce((value, item) => {
          value[item.name] = { id: item.id, enabled: false };
          return value;
        }, {});
        this.setState({ genres: reducedGenres });
      })
      .catch(error => {
        alert(`Error on fetching genres: ${error}`);
      });
  };

  toggleGenre = event => {
    let toggledGenre = event.target.name;
    this.setState({
      genres: {
        ...this.state.genres,
        [toggledGenre]: {
          ...this.state.genres[toggledGenre],
          enabled: !this.state.genres[toggledGenre].enabled
        }
      }
    });
  };

  toggleSorting = event => {
    this.setState({ sortBy: event.target.value });
  };

  toggleDirection = event => {
    this.setState({ direction: event.target.value });
  };

  getBestMovies = () => {
    this.setState({ loading: true });
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US&page=${
        this.state.bestMoviesPage
      }`
    )
      .then(response => {
        return response.json();
      })
      .then(({ results }) => {
        this.setState(prevState => ({
          bestMovies: [...prevState.bestMovies].concat(results),
          bestMoviesPage: ++prevState.bestMoviesPage,
          loading: false
        }));
      })
      .catch(error => {
        alert(`Error on fetching best films: ${error}`);
      });
  };

  getFilteredMovies = debounce(() => {
    this.setState({ loading: true });
    let enabledGenres = [];
    for (let key in this.state.genres) {
      if (this.state.genres[key].enabled === true) {
        enabledGenres = [...enabledGenres, this.state.genres[key].id];
      }
    }
    if (enabledGenres.length > 0) {
      let page = 1;
      let enabledGenreIds = encodeURIComponent(enabledGenres.join(","));

      let sortBy;
      if (this.state.sortBy === "popularity") {
        sortBy =
          this.state.direction === "descending"
            ? "popularity.desc"
            : "popularity.asc";
      }
      if (this.state.sortBy === "date") {
        sortBy =
          this.state.direction === "descending"
            ? "release_date.desc"
            : "release_date.asc";
      }
      if (this.state.sortBy === "rating") {
        sortBy =
          this.state.direction === "descending"
            ? "vote_average.desc"
            : "vote_average.asc";
      }
      if (this.state.sortBy === "votes") {
        sortBy =
          this.state.direction === "descending"
            ? "vote_count.desc"
            : "vote_count.asc";
      }
      fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&with_genres=${enabledGenreIds}`
      )
        .then(response => {
          return response.json();
        })
        .then(obj => {
          let filteredMovies = obj.results;
          this.setState({
            filteredMovies: filteredMovies,
            filteredMoviesPage: page,
            loading: false
          });
        })
        .catch(error => {
          alert(`Error on getting films by filters: ${error}`);
        });
    } else if (enabledGenres.length < 1) {
      this.setState({
        filteredMovies: [],
        filteredMoviesPage: 1,
        loading: false
      });
    } else return;
  }, 1500);

  getMoreFilteredMovies = () => {
    this.setState({ loading: true });
    let enabledGenres = [];
    for (let key in this.state.genres) {
      if (this.state.genres[key].enabled === true) {
        enabledGenres = [...enabledGenres, this.state.genres[key].id];
      }
    }
    let enabledGenreIds = encodeURIComponent(enabledGenres.join(",")),
      sortBy = this.state.sortBy,
      page = this.state.filteredMoviesPage;
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&with_genres=${enabledGenreIds}`
    )
      .then(response => {
        return response.json();
      })
      .then(({ results }) => {
        this.setState((prevState, props) => ({
          filteredMovies: [...prevState.filteredMovies].concat(results),
          filteredMoviesPage: prevState.filteredMoviesPage++,
          loading: false
        }));
      })
      .catch(error => {
        alert(`Error on getting additional films by filters: ${error}`);
      });
  };

  searchFilms = debounce(() => {
    if (this.state.searchValue) {
      this.setState({ loading: true });
      let query = encodeURIComponent(this.state.searchValue);
      let lang = "en-US";
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=${lang}&query=${query}&page=1&include_adult=false`
      )
        .then(response => {
          return response.json();
        })
        .then(obj => {
          let films = sortByRelevance(obj);
          this.setState({
            matchFilms: films,
            loading: false
          });
        })
        .catch(error => {
          alert(`Error on searching films: ${error}`);
        });
    }
    if (!this.state.searchValue) {
      this.setState({
        matchFilms: [],
        loading: false
      });
    }
  }, 1500);

  getFavFilms = () => {
    if (localStorage["favorites"]) {
      this.setState({ favorites: [...JSON.parse(localStorage["favorites"])] });
    } else return;
  };

  toggleFilmToFav = event => {
    let filmData = JSON.parse(event.target.value),
      filmId = filmData.id,
      fav = this.state.favorites;
    if (!fav.some(film => film.id === filmId)) {
      let newFav = [{ ...filmData }, ...this.state.favorites];
      this.setState({ favorites: newFav });
      localStorage["favorites"] = JSON.stringify(newFav);
    } else {
      let newFav = fav.filter(film => film.id !== filmId);
      this.setState({ favorites: newFav });
      localStorage["favorites"] = JSON.stringify(newFav);
    }
  };

  /* getFilmById = (event, id) => {
    if (id !== this.state.filmPage.id) {
      this.setState({ loading: true });
      fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US`
      )
        .then(response => {
          return response.json();
        })
        .then(obj => {
          this.setState({
            filmPage: obj,
            loading: false
          });
        })
        .catch(error => {
          alert(`Error on routing: ${error}`);
        });
    } else return;
  }; */

  loadFilmData = filmId => {
    let stateFilmId = this.state.filmData.id;
    if (filmId !== stateFilmId) {
      this.setState({ loading: true, searching: false });
      fetch(
        `https://api.themoviedb.org/3/movie/${filmId}?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US`
      )
        .then(response => {
          return response.json();
        })
        .then(obj => {
          this.setState({ filmData: obj, loading: false });
        })
        .catch(error => {
          alert(`Error on loading film data: ${error}`);
        });
    } else return;
  };

  getSimilarFilms = filmId => {
    this.setState({ loading: true });
    let page = this.state.similarFilmsPage;
    fetch(
      `https://api.themoviedb.org/3/movie/${filmId}/similar?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US&page=${page}`
    )
      .then(response => {
        return response.json();
      })
      .then(({ results }) => {
        this.setState({ similarFilms: results, loading: false });
      })
      .catch(error => {
        alert(`Error on fetching similar films: ${error}`);
      });
  };

  getMoreSimilarFilms = filmId => {
    this.setState({ loading: true });
    let page = this.state.similarFilmsPage;
    fetch(
      `https://api.themoviedb.org/3/movie/${filmId}/similar?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US&page=${++page}`
    )
      .then(response => {
        return response.json();
      })
      .then(({ results }) => {
        this.setState(prevState => ({
          similarFilms: [...prevState.similarFilms].concat(results),
          similarFilmsPage: ++prevState.similarFilmsPage,
          loading: false
        }));
      })
      .catch(error => {
        alert(`Error on fetching similar films: ${error}`);
      });
  };

  // toggleLoading = () => {
  //   this.setState(prevState => ({ loading: !prevState }));
  // };

  changeSearchValue = event => {
    event.preventDefault();
    const value = event.target.value;
    this.setState({ searchValue: value });
  };

  enableSearching = () => {
    if (!this.state.searching) this.setState({ searching: true });
  };

  disableSearching = () => {
    if (this.state.searching) this.setState({ searching: false });
  };

  toggleMenu = event => {
    event.preventDefault();
    event.target.name === this.state.openedMenuName
      ? this.setState({
          menuIsOpen: !this.state.menuIsOpen
        })
      : this.setState({
          openedMenuName: event.target.name,
          menuIsOpen: true
        });
  };

  toggleNightMode = event => {
    event.preventDefault();
    this.setState({
      nightModeIsOn: !this.state.nightModeIsOn
    });
  };

  componentDidMount() {
    this.getGenres();
    this.getFavFilms();
    this.getBestMovies();
  }

  render() {
    return (
      <Body nightmode={this.state.nightModeIsOn}>
        <Helmet
          title={
            this.state.openedMenuName === "Profile"
              ? "Profile"
              : "Moviesearcher"
          }
        />
        <WidthContainer>
          {this.state.loading && (
            <Loading nightmode={this.state.nightModeIsOn}>Loading...</Loading>
          )}
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <MainHeader
                  {...props}
                  {...this.state}
                  toggleGenre={this.toggleGenre}
                  toggleSorting={this.toggleSorting}
                  toggleDirection={this.toggleDirection}
                  searchFilms={this.searchFilms}
                  changeSearchValue={this.changeSearchValue}
                  enableSearching={this.enableSearching}
                  disableSearching={this.disableSearching}
                  toggleMenu={this.toggleMenu}
                  toggleNightMode={this.toggleNightMode}
                  toggleFilmToFav={this.toggleFilmToFav}
                  getFilteredMovies={this.getFilteredMovies}
                />
              )}
            />
            <Route
              path="/filmpages/"
              render={props => (
                <SideHeader
                  {...props}
                  {...this.state}
                  searchFilms={this.searchFilms}
                  changeSearchValue={this.changeSearchValue}
                  enableSearching={this.enableSearching}
                  disableSearching={this.disableSearching}
                  toggleFilmToFav={this.toggleFilmToFav}
                  toggleNightMode={this.toggleNightMode}
                />
              )}
            />
          </Switch>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Main
                  {...props}
                  {...this.state}
                  toggleFilmToFav={this.toggleFilmToFav}
                  getMoreFilteredMovies={this.getMoreFilteredMovies}
                  getBestMovies={this.getBestMovies}
                />
              )}
            />
            <Route
              path="/filmpages/"
              render={props => (
                <FilmPage
                  {...props}
                  favorites={this.state.favorites}
                  nightmode={this.state.nightModeIsOn}
                  genres={this.state.genres}
                  filmData={this.state.filmData}
                  similarFilms={this.state.similarFilms}
                  toggleFilmToFav={this.toggleFilmToFav}
                  loadFilmData={this.loadFilmData}
                  getSimilarFilms={this.getSimilarFilms}
                  getMoreSimilarFilms={this.getMoreSimilarFilms}
                />
              )}
            />
          </Switch>
          <Footer nightmode={this.state.nightModeIsOn} />
        </WidthContainer>
      </Body>
    );
  }
}

export default App;
