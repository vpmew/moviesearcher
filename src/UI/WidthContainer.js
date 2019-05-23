import styled from "styled-components";
import variables from "../variables";

const WidthContainer = styled.div`
  width: ${variables.widthS};
  margin: 0 auto;

  @media (min-width: ${variables.widthM}) {
    width: ${variables.widthM};
  }

  @media (min-width: ${variables.widthL}) {
    width: ${variables.widthL};
  }
`;

export default WidthContainer;
