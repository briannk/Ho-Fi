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
  const userCardStyles = `flex flex-col p-6 mx-auto justify-center items-center 
    gap-4 lg:gap-2 rounded-xl`;
  const buttonStyles = `whitespace-nowrap text-white border-2 border-white hover:border-transparent`;

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
          <span className="text-white">{user.email}</span>
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
          <Link to="/login">
            <Button content="Log In" className={buttonStyles} />
          </Link>
          <span className="lg:hidden">Don't have an account?</span>
          <Link to="/signup" className="lg:hidden">
            <Button content="Sign Up" className={buttonStyles} />
          </Link>
        </>
      )}
    </div>
  );
};

export default UserCard;
