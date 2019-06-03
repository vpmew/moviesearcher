import React from "react";
import styled from "styled-components";
import Avatar from "../UI/Avatar";
import UserName from "../UI/UserName";
import InfoMessage from "../UI/InfoMessage";
import Favorites from "./Favorites";
import variables from "../utilities/variables";
import StateContext from "../StateContext";

const UserProfileStructure = ({ className }) => {
  return (
    <StateContext.Consumer>
      {({
        userName,
        userAuthorized,
        userAvatar,
        defaultAvatar,
        defaultName,
        favorites,
        nightModeIsOn,
        methods
      }) => (
        <div className={className}>
          <div className="wrapper">
            {!userName ? (
              <InfoMessage color="orangered">
                Registration is unavailable at the moment, but you can add films
                to favorites.
              </InfoMessage>
            ) : null}
            <div className="user-info">
              <Avatar
                src={userAuthorized ? userAvatar : defaultAvatar}
                alt="Your avatar"
              />
              <UserName>{userAuthorized ? userName : defaultName}</UserName>
            </div>
          </div>
          <Favorites
            favorites={favorites}
            toggleFilmToFav={methods.toggleFilmToFav}
            nightmode={nightModeIsOn}
          />
        </div>
      )}
    </StateContext.Consumer>
  );
};

const UserProfile = styled(UserProfileStructure)`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  flex-shrink: 0;
  width: 100%;
  padding: 20px 0;

  .user-info {
    width: 30%;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    align-self: center;
  }

  .wrapper {
    display: flex;
    flex-flow: column;
  }

  @media (min-width: ${variables.widthM}) {
    & .wrapper {
      flex-flow: row;
      justify-content: space-around;
    }

    & .user-info {
      width: 15%;
      margin-top: 0;
      align-self: flex-start;
      order: -1;
      font-size: 0.7em;
      margin-left: 0;
      margin-right: 0;
    }

    & .wrapper > p {
      width: 65%;
      margin-right: 0;
      margin-left: 0;
    }
  }

  @media (min-width: ${variables.widthL}) {
    order: 3;
    padding-bottom: 0;
    padding-top: 40px;

    & > .wrapper {
      width: 45%;
      align-content: flex-start;
      align-items: flex-start;
      flex-flow: row wrap;
    }

    .user-info {
      width: 30%;
      margin-bottom: 50px;
      margin-top: 50px;
    }

    & .wrapper > p {
      width: 75%;
      margin: 0;
      margin-bottom: 50px;
    }
  }
`;

export default UserProfile;
