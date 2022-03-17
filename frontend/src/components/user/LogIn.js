import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMsgContext } from "../../contexts/MsgContext";

const LogIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    pw: "",
  });
  const [inputErrors, setInputErrors] = useState({
    email: false,
    pw: false,
  });
  const { setMessage, setShowMessage } = useMsgContext();

  const { user, logIn, verifyEmail } = useAuthContext();

  const containerStyles = `container mx-auto max-w-sm border-4
     rounded m-4 p-4`;

  const handleClick = async () => {
    if (userInfo.email === "" || userInfo.pw === "") {
      if (userInfo.email === "") {
        setInputErrors((prevState) => {
          return { ...prevState, email: true };
        });
      }
      if (userInfo.pw === "") {
        setInputErrors((prevState) => {
          return { ...prevState, pw: true };
        });
      }
      return;
    } else {
      try {
        const resp = await logIn(userInfo.email, userInfo.pw);
        if (resp.success) {
          if (user && !user.emailVerified) {
            setMessage({
              type: "info",
              content: (
                <>
                  <p>
                    E-mail must be verified in order to login. Please check your
                    inbox or resend the verification.
                  </p>
                  <Button
                    size="mini"
                    onClick={async () => await verifyEmail(user)}
                  >
                    Resend Link
                  </Button>
                </>
              ),
              auto: false,
            });
          } else {
            setMessage({
              type: "success",
              content: `Welcome back, ${userInfo.email}!`,
            });
          }
        } else {
          setMessage({
            type: "error",
            content: resp.message,
          });
        }
      } catch (e) {
      } finally {
        setShowMessage(true);
      }
    }
  };

  const handleInputChange = (e, { name, value }) => {
    if (value !== "" && inputErrors[name]) {
      setInputErrors({ ...inputErrors, [name]: false });
    }
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className={containerStyles}>
      {/* replace h3 with custom section component including image */}
      <h3>Log in to continue</h3>
      <Form className="my-4">
        <Form.Input
          name="email"
          label="E-mail"
          placeholder="Enter your e-mail"
          error={
            inputErrors.email
              ? { content: "Please enter a valid e-mail.", pointing: "above" }
              : null
          }
          value={userInfo.email}
          onChange={handleInputChange}
        />
        <Form.Input
          name="pw"
          type="password"
          label="Password"
          placeholder="Enter your password"
          error={
            inputErrors.pw
              ? { content: "Please enter a password.", pointing: "above" }
              : null
          }
          value={userInfo.pw}
          onChange={handleInputChange}
        />
        <Link to="/resetpassword" className="block mb-4">
          Forgot Password?
        </Link>
        <Form.Button onClick={handleClick}>Log In</Form.Button>
      </Form>
      <span>
        Don't have an account? <Link to="/signup">Sign Up.</Link>
      </span>
    </div>
  );
};

export default LogIn;
