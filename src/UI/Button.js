import styled from "styled-components";
import variables from "../variables";
import nmLight from "../img/nm-light.svg";
import nmDark from "../img/nm-dark.svg";

const Button = styled.button`
  width: ${props =>
    props.width
      ? props.width
      : props.name === "Night mode"
      ? "calc(33% / 2)"
      : "33%"};
  height: 40px;
  cursor: pointer;
  border: 2px solid
    ${props =>
      props.nightmode ? variables.fontColorLight : variables.fontColorDark};
  color: ${props => {
    let isActive = props.menuIsOpen && props.openedMenuName === props.name;
    if (props.nightmode && isActive) {
      return variables.fontColorDark;
    } else if (props.nightmode && !isActive) {
      return variables.fontColorLight;
    } else if (!props.nightmode && isActive) {
      return variables.backgroundColorLight;
    } else if (!props.nightmode && !isActive) {
      return variables.fontColorDark;
    }
  }};
  font-size: ${props =>
    props.fontSize
      ? props.fontSize
      : props.name === "Night mode"
      ? "0"
      : "inherit"};
  font-family: inherit;
  background-color: ${props => {
    let isActive = props.menuIsOpen && props.openedMenuName === props.name;
    if (props.nightmode && isActive) {
      return variables.fontColorLight;
    } else if (props.nightmode && !isActive) {
      return "transparent";
    } else if (!props.nightmode && isActive) {
      return variables.backgroundColorDark;
    } else if (!props.nightmode && !isActive) {
      return "transparent";
    }
  }};
  background-image: ${props =>
    props.image
      ? `url(${props.image})`
      : props.name === "Night mode" && props.nightmode
      ? `url(${nmLight})`
      : props.name === "Night mode" && !props.nightmode
      ? `url(${nmDark})`
      : "none"};
  background-size: 100% 70%;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  transition: box-shadow 0.1s ease;

  &:hover {
    box-shadow: -1px 2px 3px 0
      ${props =>
        props.nightmode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.4)"};
  }

  &:active {
    color: ${props =>
      props.nightmode
        ? variables.fontColorDark
        : variables.backgroundColorLight};
    background-color: ${props =>
      props.nightmode
        ? variables.fontColorLight
        : variables.backgroundColorDark};
  }

  @media (min-width: ${variables.widthM}) {
    height: 45px;
    width: ${props =>
      props.width
        ? props.width
        : props.name === "Night mode"
        ? "20%"
        : "calc(40% + 2px)"};
  }

  @media (min-width: ${variables.widthL}) {
    height: 50px;
  }
`;

export default Button;
