import React from "react";
import styled from "styled-components";
import variables from "../utilities/variables";
import InfoMessage from "../UI/InfoMessage";
import { debounce } from "lodash";
import StateContext from "../StateContext";

const FiltersStructure = ({ className }) => (
  <StateContext.Consumer>
    {({ genres, sortingOptions, sortBy, direction, methods }) => {
      let genreList = Object.keys(genres);
      let genresIsChecked = false;
      for (let key in genres) {
        if (genres[key].enabled === true) {
          genresIsChecked = true;
          break;
        }
      }
      let getFilteredMoviesWithDebounce = debounce(
        methods.getFilteredMovies,
        1500
      );
      return (
        <form className={className}>
          {!genresIsChecked ? (
            <InfoMessage color="orangered" width="100%" margin="0 auto 5px">
              Please, choose at least one genre to see results below.
            </InfoMessage>
          ) : null}
          <fieldset className="genres">
            <legend>Genres:</legend>
            <div className="fieldsetFlexFix">
              {genreList.map(name => (
                <label
                  className={`${name.replace(" ", "-").toLowerCase()}`}
                  key={genres[name].id}
                >
                  <input
                    onChange={event => {
                      methods.toggleGenre(event);
                      getFilteredMoviesWithDebounce();
                    }}
                    type="checkbox"
                    name={name}
                    checked={genres[name].enabled}
                  />
                  <span>{name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="sort-by">
            <legend>Sort by:</legend>
            <div className="fieldsetFlexFix">
              {sortingOptions.map(option => {
                return (
                  <label key={option}>
                    <input
                      type="radio"
                      name="sortBy"
                      value={option}
                      checked={option === sortBy}
                      onChange={event => {
                        methods.toggleSorting(event);
                        setTimeout(() => methods.getFilteredMovies(), 0);
                      }}
                    />
                    <span>
                      {(option => {
                        let arr = option.split("");
                        let str;
                        arr[0] = arr[0].toUpperCase();
                        str = arr.join("");
                        return str;
                      })(option)}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="direction">
            <legend>Direction:</legend>
            <div className="fieldsetFlexFix">
              <label>
                <input
                  type="radio"
                  name="direction"
                  value="ascending"
                  checked={direction === "ascending"}
                  onChange={event => {
                    methods.toggleDirection(event);
                    setTimeout(() => methods.getFilteredMovies(), 0);
                  }}
                />
                <span>Ascending</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="direction"
                  value="descending"
                  checked={direction === "descending"}
                  onChange={event => {
                    methods.toggleDirection(event);
                    setTimeout(() => methods.getFilteredMovies(), 0);
                  }}
                />
                <span>Descending</span>
              </label>
            </div>
          </fieldset>
        </form>
      );
    }}
  </StateContext.Consumer>
);

const Filters = styled(FiltersStructure)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding-top: 10px;

  & input:not(:checked) ~ span:hover {
    text-decoration: underline;
  }

  & fieldset {
    margin: 0;
    border: 2px solid
      ${props =>
        props.nightmode ? variables.fontColorLight : variables.fontColorDark};

    & legend {
      font-size: 18px;
      padding: 0 10px;
    }

    & label {
      width: 100%;
      height: 35px;
    }

    & div {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 100%;
      align-content: space-between;
    }
  }

  & .genres {
    width: 100%;
    height: 380px;

    & label {
      width: 45%;

      & input {
        display: none;
      }
      & span {
        position: relative;
        display: block;
        cursor: pointer;
        width: 100%;
        height: 100%;
        text-align: left;
        padding-left: 25px;
        padding-top: 6px;

        &::before {
          content: "";
          position: absolute;
          top: 8px;
          left: 0;
          width: 16px;
          height: 16px;
          border: 2px solid
            ${props =>
              props.nightmode
                ? variables.fontColorLight
                : variables.fontColorDark};
          transition: transform 0.3s;
        }
      }
      & input:checked ~ span::before {
        width: 21px;
        height: 10px;
        border-width: 4px;
        border-color: ${props =>
          props.nightmode ? "palegreen" : "mediumseagreen"};
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
      }
    }
  }

  & .sort-by,
  .direction {
    width: 48%;
    margin: 10px 0 0;
  }

  & .sort-by {
    & input {
      display: none;
    }

    & span {
      position: relative;
      display: block;
      cursor: pointer;
      width: 100%;
      height: 100%;
      text-align: left;
      padding-left: 25px;
      padding-top: 6px;

      &::before,
      &::after {
        position: absolute;
        top: 8px;
        left: 0;
        content: "";
        border-radius: 50%;
      }

      &::before {
        width: 16px;
        height: 16px;
        border: 2px solid
          ${props =>
            props.nightmode
              ? variables.fontColorLight
              : variables.fontColorDark};
      }
      &::after {
        width: 16px;
        height: 16px;
        background: ${props =>
          props.nightmode ? "palegreen" : "mediumseagreen"};
        transform: scale(0);
        transition: transform 0.3s;
      }
    }

    & input[type="radio"]:checked ~ span::after {
      transform: scale(1.1);
    }
  }

  & .direction {
    & input {
      display: none;
    }

    & span {
      position: relative;
      display: block;
      cursor: pointer;
      width: 100%;
      height: 100%;
      text-align: left;
      padding-left: 25px;
      padding-top: 6px;

      &::before {
        position: absolute;
        top: 8px;
        left: 0;
        content: "";
        width: 0;
        height: 0;
        border-top: 16px solid
          ${props =>
            props.direction === "descending" && props.nightmode
              ? "palegreen"
              : props.direction === "descending" && !props.nightmode
              ? "mediumseagreen"
              : props.nightmode
              ? variables.fontColorLight
              : !props.nightmode
              ? variables.fontColorDark
              : "transparent"};
        border-bottom: 0px solid transparent;
        border-right: 10px solid transparent;
        border-left: 10px solid transparent;

        transition: ${props =>
          props.direction === "descending" ? "border-top 0.3s" : "none"};
      }
    }

    & label:first-child {
      & span::before {
        border-bottom: 16px solid
          ${props =>
            props.direction === "ascending" && props.nightmode
              ? "palegreen"
              : props.direction === "ascending" && !props.nightmode
              ? "mediumseagreen"
              : props.nightmode
              ? variables.fontColorLight
              : !props.nightmode
              ? variables.fontColorDark
              : "transparent"};
        border-top: 0px solid transparent;

        transition: ${props =>
          props.direction === "ascending" ? "border-bottom 0.3s" : "none"};
      }
    }
  }

  @media (min-width: ${variables.widthM}) {
    width: 100%;
    .genres {
      width: 60%;
      height: 400px;

      & label span {
        padding-top: 0;
        line-height: 32px;
      }
    }
    .sort-by {
      width: 35%;
      height: 240px;
      margin: 0;

      & label span {
        padding-top: 0;
        line-height: 32px;
      }
    }

    .direction {
      width: 35%;
      height: 160px;
      margin-top: -160px;
      margin-left: 65%;

      & label span {
        padding-top: 0;
        line-height: 32px;
      }
    }

    & fieldset {
      & legend {
        font-size: inherit;
      }
    }
  }

  @media (min-width: ${variables.widthL}) {
    order: 3;

    & .genres {
      width: 65%;
      height: 300px;

      & label {
        width: calc(100% / 3);
      }
    }

    & .sort-by {
      width: 30%;
      height: 180px;
    }

    & .direction {
      width: 30%;
      height: 115px;
      margin-top: -115px;
      margin-left: 70%;
    }
  }
`;

export default Filters;
