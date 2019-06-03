import styled from "styled-components";
import variables from "../utilities/variables";

const Search = styled.input`
  width: 100%;
  height: 40px;
  border: 2px solid
    ${props =>
      props.nightmode ? variables.fontColorLight : variables.fontColorDark};
  font-size: inherit;
  font-family: inherit;
  background-color: ${props =>
    props.nightmode
      ? variables.backgroundColorDark
      : variables.backgroundColorLight};
  color: inherit;
  padding: 0 15px;
  transition: box-shadow 0.1s ease;

  &::placeholder {
    color: ${props =>
      props.nightmode ? variables.fontColorLight : variables.fontColorDark};
  }

  &:hover {
    box-shadow: inset -1px 1px 3px 0 ${props => (props.nightmode ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.4)")};
  }

  @media (min-width: ${variables.widthM}) {
    height: 45px;
  }

  @media (min-width: ${variables.widthL}) {
    height: 50px;
  }
`;

export default Search;
