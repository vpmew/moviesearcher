import styled from "styled-components";
import variables from "../variables";

const UserName = styled.p`
  width: 100%;
  margin: 0 0 10px;
  font-weight: bold;
  font-size: 1.2em;
  text-align: center;

  @media (min-width: ${variables.widthL}) {
    margin: 0;
  }
`;

export default UserName;
