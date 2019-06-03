import styled from "styled-components";
import variables from "../utilities/variables";

const Body = styled.div`
  background-color: ${props =>
    props.nightmode
      ? variables.backgroundColorDark
      : variables.backgroundColorLight};
  color: ${props =>
    props.nightmode ? variables.fontColorLight : variables.fontColorDark};
  font-family: "Monda", "Arial", sans-serif;
  font-size: ${variables.fontSizeS};
  line-height: ${variables.lineHeightS};

  box-sizing: border-box;
  & *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  @media (min-width: ${variables.widthM}) {
    font-size: ${variables.fontSizeM};
    line-height: ${variables.lineHeightM};
  }

  @media (min-width: ${variables.widthL}) {
    font-size: ${variables.fontSizeL};
    line-height: ${variables.lineHeightL};
  }
`;

export default Body;
