import React from "react";
import Filters from "./Filters";
import Profile from "./Profile";

const Menu = ({ openedMenuName, menuIsOpen, direction, nightmode }) => {
  let Menu;
  if (openedMenuName === "Filters" && menuIsOpen) {
    Menu = <Filters nightmode={nightmode} direction={direction} />;
  } else if (openedMenuName === "Profile" && menuIsOpen) {
    Menu = <Profile />;
  } else {
    Menu = null;
  }
  return Menu;
};

export default Menu;
