import React from "react";
import styled from "styled-components";
import ReloadButton from "../UI/ReloadButton";

const ErrorStructure = ({ message }) => (
  <div>
    <p>{message}</p>
    <ReloadButton />
  </div>
);

const Error = styled(ErrorStructure)`
  margin: 0 auto;
  width: 600px;
  height: auto;
`;

export default Error;
