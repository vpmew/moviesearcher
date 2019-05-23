import styled from "styled-components";
import variables from "../variables";

const ButtonBlock = styled.div`
  width: ${props => (props.width ? props.width : "100%")};
  display: flex;
  flex-shrink: 0;
  justify-content: ${props =>
    props.justify ? props.justify : "space-between"};

  & *:nth-child(n + 2) {
    margin-left: -2px;
  }

  @media (min-width: ${variables.widthM}) {
    width: ${props => (props.width ? props.width : "calc(40% + 2px)")};
    margin-left: -2px;
  }

  @media (min-width: ${variables.widthL}) {
    width: ${props => (props.width ? props.width : "45%")};
    margin-left: 0;
  }
`;

export default ButtonBlock;
