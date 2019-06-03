import React from "react";
import styled from "styled-components";
import variables from "../utilities/variables";

const FooterStructure = ({ className }) => {
  return (
    <footer className={className}>
      <p>
        <span>
          App created by <a href="https://vpmew.github.io/usercard/">vpmew</a>.
        </span>
        <span>
          Database provided by <a href="https://www.themoviedb.org/">TMDb</a>.
        </span>
        <span className="version">{`Version: ${variables.version}`}</span>
      </p>
    </footer>
  );
};

const Footer = styled(FooterStructure)`
  position: relative;
  padding: 20px 0;
  margin-top: auto;

  & p {
    margin: 0;
  }

  & span {
    display: block;
    text-align: center;
    margin-bottom: 5px;
  }

  & .version {
    font-size: 0.8em;
  }

  & a {
    position: relative;
    font-weight: bold;
    text-decoration: none;
    color: ${props =>
      props.nightmode ? variables.fontColorLight : variables.fontColorDark};

    &::before {
      display: none;
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 2px;

      background-color: ${props =>
        props.nightmode ? variables.fontColorLight : variables.fontColorDark};
    }

    &:hover::before {
      display: block;
    }
  }

  &::after {
    content: "";
    position: absolute;
    height: 2px;
    left: 0;
    right: 0;
    top: 0;
    background-color: lightgrey;
  }
`;

export default Footer;
