import React from "react";
import MainHeader from "./Header/MainHeader";
import SideHeader from "./Header/SideHeader";
import Main from "./Main/Main";
import FilmPage from "./FilmPage/FilmPage";
import { Route, Switch } from "react-router-dom";
import StateContext from "./StateContext";

const RoutingComponent = () => (
  <StateContext.Consumer>
    {({ filteredMovies }) => (
      <>
        <Switch>
          <Route path="/" exact component={MainHeader} />
          <Route path="/filmpage/" component={SideHeader} />
        </Switch>
        <Switch>
          <Route
            path="/"
            exact
            render={props => <Main filteredMovies={filteredMovies} />}
          />
          <Route path="/filmpage/" render={props => <FilmPage {...props} />} />
        </Switch>
      </>
    )}
  </StateContext.Consumer>
);

export default RoutingComponent;
