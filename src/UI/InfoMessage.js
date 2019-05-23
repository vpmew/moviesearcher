import styled from "styled-components";

const InfoMessage = styled.p`
  color: ${props => props.color};
  font-weight: bold;
  border: 2px solid ${props => props.color};
  width: ${props => props.width};
  padding: 5px 10px;
  text-align: center;
  margin: ${props => props.margin || "auto"};
`;

export default InfoMessage;
