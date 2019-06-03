import styled from "styled-components";
import variables from "../utilities/variables";

const WidthContainer = styled.div`
  width: ${variables.widthS};
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-flow: column;

  @media (min-width: ${variables.widthM}) {
    width: ${variables.widthM};
  }

  @media (min-width: ${variables.widthL}) {
    width: ${variables.widthL};
  }
`;

export default WidthContainer;
