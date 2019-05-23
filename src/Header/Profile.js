import React from "react";
import styled from "styled-components";
import Avatar from "../UI/Avatar";
import UserName from "../UI/UserName";
import InfoMessage from "../UI/InfoMessage";
import Favorites from "./Favorites";
import variables from "../variables";

const UserProfileStructure = ({
  userAuthorized,
  userAvatar,
  defaultAvatar,
  userName,
  defaultName,
  nightmode,
  className,
  favorites,
  toggleFilmToFav
}) => {
  return (
    <div className={className}>
      {!userName ? (
        <InfoMessage color="orangered">
          Registration is unavailable at the moment, but you can add films to
          favorites.
        </InfoMessage>
      ) : null}
      <div className="user-info">
        <Avatar
          src={userAuthorized ? userAvatar : defaultAvatar}
          alt="Your avatar"
        />
        <UserName>{userAuthorized ? userName : defaultName}</UserName>
      </div>
      <Favorites
        favorites={favorites}
        toggleFilmToFav={toggleFilmToFav}
        nightmode={nightmode}
      />
    </div>
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

  @media (min-width: ${variables.widthM}) {
    & .user-info {
      width: 15%;
      margin-top: 0;
      align-self: flex-start;
      order: -1;
      font-size: 0.7em;
    }

    & > p {
      width: 65%;
    }
  }

  @media (min-width: ${variables.widthL}) {
    order: 3;
    padding-bottom: 0;

    & .user-info {
      order: 1;
      margin-bottom: auto;
      margin-top: auto;
    }

    & > p {
      width: 100%;
      margin-bottom: 30px;
    }
  }
`;

export default UserProfile;
