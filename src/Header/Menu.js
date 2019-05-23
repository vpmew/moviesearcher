import React from "react";
import Filters from "./Filters";
import Profile from "./Profile";

const Menu = ({
  openedMenuName,
  menuIsOpen,
  genres,
  toggleGenre,
  sortBy,
  sortingOptions,
  toggleSorting,
  direction,
  toggleDirection,
  userAuthorized,
  userAvatar,
  defaultAvatar,
  userName,
  defaultName,
  nightmode,
  favorites,
  toggleFilmToFav,
  getFilteredMovies
}) => {
  let Menu;
  if (openedMenuName === "Filters" && menuIsOpen) {
    Menu = (
      <Filters
        genres={genres}
        toggleGenre={toggleGenre}
        sortBy={sortBy}
        sortingOptions={sortingOptions}
        toggleSorting={toggleSorting}
        direction={direction}
        toggleDirection={toggleDirection}
        nightmode={nightmode}
        getFilteredMovies={getFilteredMovies}
      />
    );
  } else if (openedMenuName === "Profile" && menuIsOpen) {
    Menu = (
      <Profile
        userAuthorized={userAuthorized}
        userAvatar={userAvatar}
        defaultAvatar={defaultAvatar}
        userName={userName}
        defaultName={defaultName}
        nightmode={nightmode}
        favorites={favorites}
        toggleFilmToFav={toggleFilmToFav}
      />
    );
  } else {
    Menu = null;
  }
  return Menu;
};

export default Menu;
