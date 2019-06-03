import React from "react";
import styled from "styled-components";
import variables from "../utilities/variables";

const RatingStructure = ({ className, voteAverage, voteCount }) => (
  <div className={className}>
    {voteAverage && <p className="vote-avg">{voteAverage}</p>}
    {voteCount && <p className="vote-count">{voteCount} votes</p>}
  </div>
);

const Rating = styled(RatingStructure)`
  position: absolute;
  right: 0;
  top: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 5px;
  background-color: ${props =>
    props.nightmode ? variables.backgroundColorDark : variables.fontColorDark};

  & .vote-avg {
    margin: 0;
    margin-bottom: 10px;
    font-size: 2em;
    color: ${props =>
      props.voteAverage >= 7
        ? "mediumseagreen"
        : props.voteAverage >= 5
        ? "#f3f300"
        : props.voteAverage >= 3
        ? "orange"
        : "orangered"};
  }

  & .vote-count {
    margin: 0;
    align-self: flex-end;
    color: ${props =>
      props.nightmode
        ? variables.fontColorLight
        : variables.backgroundColorLight};
    font-size: 1em;
  }

  &:hover {
    opacity: 0.2;
  }
`;

export default Rating;
