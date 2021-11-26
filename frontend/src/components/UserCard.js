import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Message } from "semantic-ui-react";
import { useAuthContext } from "../contexts/AuthContext";

const UserCard = () => {
  const { user, isLoggedIn, signOut } = useAuthContext();
  const [message, setMessage] = useState();

  // css styles
  const userCardStyles = `container flex flex-col p-6 mx-auto justify-center items-center 
    space-y-4 rounded-xl`;
  const buttonStyles = ``;

  const handleSignOut = async () => {
    console.log("Signing out...");
    const resp = await signOut();
    setMessage(
      <Message color={resp.success ? "green" : "red"} content={resp.message} />
    );
  };
  return (
    <div className={userCardStyles} id="user-card">
      {isLoggedIn ? (
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
            content="Log In"
            className={buttonStyles}
            as={Link}
            to="/login"
          />
          <span>Don't have an account?</span>
          <Button
            content="Sign Up"
            className={buttonStyles}
            as={Link}
            to="/signup"
          />
        </>
      )}
    </div>
  );
};

export default UserCard;
