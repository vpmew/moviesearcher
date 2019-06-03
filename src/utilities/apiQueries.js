const queries = {
  getGenresQuery() {
    return `https://api.themoviedb.org/3/genre/movie/list?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US`;
  },
  getBestFilmsQuery(pageNumber) {
    return `https://api.themoviedb.org/3/movie/top_rated?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US&page=${pageNumber}`;
  },
  getFilteredFilmsQuery(sortBy, pageNumber, genresIds) {
    return `https://api.themoviedb.org/3/discover/movie?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${pageNumber}&with_genres=${genresIds}`;
  },
  getSearchByStringQuery(lang, string) {
    return `https://api.themoviedb.org/3/search/movie?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=${lang}&query=${string}&page=1&include_adult=false`;
  },
  getFilmDataQuery(filmId) {
    return `https://api.themoviedb.org/3/movie/${filmId}?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US`;
  },
  getSimilarFilmsQuery(filmId, page) {
    return `https://api.themoviedb.org/3/movie/${filmId}/similar?api_key=7eab7ddc9f76337597b66b8eae0b15a9&language=en-US&page=${page}`;
  }
};

export default queries;
