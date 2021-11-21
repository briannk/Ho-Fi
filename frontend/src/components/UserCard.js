import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useAuthContext } from "../contexts/AuthContext";

const UserCard = () => {
  const { user, signOut } = useAuthContext();

  // css styles
  const userCardStyles = `container flex flex-col p-6 mx-auto justify-center items-center 
    space-y-4 rounded-xl`;
  const buttonStyles = ``;

  const handleSignOut = async () => {
    console.log("Signing out...");
    const result = await signOut();
    console.log(result);
  };
  return (
    <div className={`${userCardStyles}`} id="user-card">
      {user ? (
        <>
          <span>{user.email}</span>
          <Button
            type="button"
            className={buttonStyles}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Button
            // inverted
            content="Log In"
            className={buttonStyles}
            as={Link}
            to="/login"
          ></Button>
          <span>Don't have an account?</span>
          <Button
            // inverted
            content="Sign Up"
            className={buttonStyles}
            as={Link}
            to="/signup"
          ></Button>
        </>
      )}
    </div>
  );
};

export default UserCard;
