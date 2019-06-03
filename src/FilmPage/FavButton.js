import styled from "styled-components";
import variables from "../utilities/variables";
import heartIcoLight from "../img/heart-off-light.svg";
import heartIcoDark from "../img/heart-off-dark.svg";
import heartIcoActive from "../img/heart-on.svg";

const FavButton = styled.button`
  width: 25%;
  height: auto;
  padding: 0;
  border: none;
  background-repeat: no-repeat;
  background-size: 80% 80%;
  background-position: 50% 50%;
  background-color: transparent;
  background-image: ${props =>
    props.favorites.some(film => Number(film.id) === Number(props.filmData.id))
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

  @media (min-width: ${variables.widthM}) {
    background-size: 70% 70%;
    &:hover {
      background-size: 80% 80%;
    }
  }
`;

export default FavButton;
