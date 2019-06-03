import styled from "styled-components";
import variables from "../utilities/variables";

const Tagline = styled.p`
  margin-top: 0;
  width: 100%;
  position: relative;
  font-style: italic;
  padding-left: 10px;

  &::after {
    content: "";
    position: absolute;
    width: 2px;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: ${props =>
      props.nightmode ? variables.fontColorLight : variables.fontColorDark};
  }
`;

export default Tagline;
