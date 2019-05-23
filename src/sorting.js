export const sortByPopularity = ({ results }) => {
  let sortedMovies = [...results]
    .sort((a, b) => {
      return a.popularity - b.popularity;
    })
    .reverse();
  return sortedMovies;
};

export const sortByRelevance = ({ results }) => {
  let sortedMovies = [...results]
    .sort((a, b) => {
      return (
        a.vote_count / 1000 +
        a.vote_average -
        (b.vote_count / 1000 + b.vote_average)
      );
    })
    .reverse();
  return sortedMovies;
};
