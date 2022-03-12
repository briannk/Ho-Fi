import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMsgContext } from "../../contexts/MsgContext";

const UserCard = () => {
  const { user, isLoggedIn, signOut } = useAuthContext();

  const { setMessage, setShowMessage } = useMsgContext();

  const navigate = useNavigate();

  // css styles
  const userCardStyles = `container flex flex-col p-6 mx-auto justify-center items-center 
    space-y-4 rounded-xl`;
  const buttonStyles = ``;

  const handleSignOut = async () => {
    try {
      await signOut();
      setMessage({ content: "Successfully signed out." });
      navigate("/");
    } catch (e) {
    } finally {
      setShowMessage(true);
    }
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
