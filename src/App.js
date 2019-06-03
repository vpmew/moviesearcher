import React, { Component } from "react";
import Loading from "./UI/Loading";
import Footer from "./Footer/Footer";
import Body from "./UI/Body";
import WidthContainer from "./UI/WidthContainer";
import { sortByRelevance } from "./utilities/sorting";
import defaultAvatar from "./img/default-avatar.jpg";
import { debounce } from "lodash";
import Helmet from "react-helmet";
import apiQueries from "./utilities/apiQueries";
import RoutingComponent from "./RoutingComponent";
import StateContext from "./StateContext";

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
    similarFilmsPage: 1,

    methods: {
      autoLoading: (target, func) => {
        this.autoLoading(target, func);
      },
      getSortingOption: () => {
        this.getSortingOption();
      },
      toggleGenre: event => {
        this.toggleGenre(event);
      },
      toggleSorting: event => {
        this.toggleSorting(event);
      },
      toggleDirection: event => {
        this.toggleDirection(event);
      },
      getBestMovies: () => {
        this.getBestMovies();
      },
      getFilteredMovies: () => {
        this.getFilteredMovies();
      },
      getMoreFilteredMovies: () => {
        this.getMoreFilteredMovies();
      },
      searchFilms: () => {
        this.searchFilms();
      },
      toggleFilmToFav: filmData => {
        this.toggleFilmToFav(filmData);
      },
      loadFilmData: filmId => {
        this.loadFilmData(filmId);
      },
      getSimilarFilms: (filmId, prevFilmId) => {
        this.getSimilarFilms(filmId, prevFilmId);
      },
      changeSearchValue: event => {
        this.changeSearchValue(event);
      },
      clearSearchValue: input => {
        this.clearSearchValue(input);
      },
      enableSearching: () => {
        this.enableSearching();
      },
      disableSearching: () => {
        this.disableSearching();
      },
      toggleMenu: event => {
        this.toggleMenu(event);
      },
      toggleNightMode: event => {
        this.toggleNightMode(event);
      }
    }
  };

  getSortingOption = () => {
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
    return sortBy;
  };

  getGenres = () => {
    fetch(apiQueries.getGenresQuery())
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
    fetch(apiQueries.getBestFilmsQuery(this.state.bestMoviesPage))
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

  getFilteredMovies = () => {
    this.setState({ loading: true });
    let enabledGenres = [];
    for (let key in this.state.genres) {
      if (this.state.genres[key].enabled === true) {
        enabledGenres = [...enabledGenres, this.state.genres[key].id];
      }
    }
    if (enabledGenres.length > 0) {
      let page = 1;
      let genresIds = encodeURIComponent(enabledGenres.join(","));
      let sortBy = this.getSortingOption();
      fetch(apiQueries.getFilteredFilmsQuery(sortBy, page, genresIds))
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
    }
  };

  getMoreFilteredMovies = () => {
    this.setState({ loading: true });
    let enabledGenres = [];
    for (let key in this.state.genres) {
      if (this.state.genres[key].enabled === true) {
        enabledGenres = [...enabledGenres, this.state.genres[key].id];
      }
    }
    let genresIds = encodeURIComponent(enabledGenres.join(",")),
      page = this.state.filteredMoviesPage,
      sortBy = this.getSortingOption();
    fetch(apiQueries.getFilteredFilmsQuery(sortBy, ++page, genresIds))
      .then(response => {
        return response.json();
      })
      .then(({ results }) => {
        this.setState(prevState => ({
          filteredMovies: [...prevState.filteredMovies].concat(results),
          filteredMoviesPage: ++prevState.filteredMoviesPage,
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
      let string = encodeURIComponent(this.state.searchValue);
      let lang = "en-US";
      fetch(apiQueries.getSearchByStringQuery(lang, string))
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
    }
  };

  toggleFilmToFav = filmData => {
    let filmId = filmData.id,
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

  loadFilmData = filmId => {
    let stateFilmId = this.state.filmData.id;
    if (filmId !== stateFilmId) {
      this.setState({ loading: true, searching: false });
      fetch(apiQueries.getFilmDataQuery(filmId))
        .then(response => {
          return response.json();
        })
        .then(obj => {
          this.setState({ filmData: obj, loading: false });
        })
        .catch(error => {
          alert(`Error on loading film data: ${error}`);
        });
    }
  };

  getSimilarFilms = (filmId, prevFilmId) => {
    this.setState({ loading: true });
    let page = filmId === prevFilmId ? this.state.similarFilmsPage + 1 : 1;
    fetch(apiQueries.getSimilarFilmsQuery(filmId, page))
      .then(response => {
        return response.json();
      })
      .then(({ results }) => {
        if (filmId === prevFilmId) {
          this.setState(prevState => ({
            similarFilms: [...prevState.similarFilms].concat(results),
            similarFilmsPage: ++prevState.similarFilmsPage,
            loading: false
          }));
        } else {
          this.setState({
            similarFilms: results,
            similarFilmsPage: 1,
            loading: false
          });
        }
      })
      .catch(error => {
        alert(`Error on fetching similar films: ${error}`);
      });
  };

  changeSearchValue = event => {
    event.preventDefault();
    const value = event.target.value;
    this.setState({ searchValue: value });
  };

  clearSearchValue = input => {
    input.focus();
    this.setState({ searchValue: "", matchFilms: null });
  };

  enableSearching = () => {
    this.setState({ searching: true });
  };

  disableSearching = () => {
    this.setState({ searching: false });
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

  autoLoading = (target, func) => {
    if (target.scrollHeight - (target.scrollTop + target.offsetHeight) < 240)
      func();
  };

  componentDidMount() {
    this.getGenres();
    this.getFavFilms();
    this.getBestMovies();
  }

  render() {
    return (
      <>
        <Helmet
          title={
            ~window.location.pathname.indexOf("filmpage")
              ? this.state.filmData.title
              : this.state.openedMenuName === "Profile" && this.state.menuIsOpen
              ? "Profile"
              : "Moviesearcher"
          }
        />
        <StateContext.Provider value={this.state}>
          <Body nightmode={this.state.nightModeIsOn}>
            <WidthContainer>
              {this.state.loading && (
                <Loading nightmode={this.state.nightModeIsOn}>
                  Loading...
                </Loading>
              )}
              <RoutingComponent />
              <Footer nightmode={this.state.nightModeIsOn} />
            </WidthContainer>
          </Body>
        </StateContext.Provider>
      </>
    );
  }
}

export default App;
