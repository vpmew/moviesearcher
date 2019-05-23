import React from "react";
import styled from "styled-components";
import variables from "../variables";

const LoadingStructure = ({ children, className }) => (
  <div className={className}>
    <div className="box">
      <span>{children}</span>
    </div>
  </div>
);
const Loading = styled(LoadingStructure)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 3;

  & .box {
    display: flex;
    position: fixed;
    z-index: 4;
    width: 120px;
    height: 40px;
    left: calc(50% - 60px);
    top: calc(30% - 20px);
    font-size: 1.4em;
    font-weight: bold;
    text-align: center;
    background-color: ${props =>
      props.nightmode
        ? variables.backgroundColorDark
        : variables.backgroundColorLight};
    color: ${props =>
      props.nightmode ? variables.fontColorLight : variables.fontColorDark};
    border: 2px solid
      ${props =>
        props.nightmode ? variables.fontColorLight : variables.fontColorDark};
  }

  & span {
    margin: auto;
  }

  @media (min-width: ${variables.widthM}) {
    & .box {
      width: 160px;
      height: 50px;
      left: calc(50% - 80px);
      top: calc(30% - 25px);
      font-size: 1.2em;
    }
  }
`;

export default Loading;
