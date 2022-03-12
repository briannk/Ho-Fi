import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "semantic-ui-react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMsgContext } from "../../contexts/MsgContext";

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    pw: "",
    pw2: "",
  });
  const [inputErrors, setInputErrors] = useState({
    email: false,
    pw: false,
    pw2: false,
  });

  const { setMessage, setShowMessage } = useMsgContext();

  const { signUp } = useAuthContext();

  const containerStyles = `container mx-auto max-w-sm border-4
     rounded m-4 p-4`;

  const handleClick = async () => {
    if (
      userInfo.email === "" ||
      userInfo.pw === "" ||
      userInfo.pw !== userInfo.pw2
    ) {
      if (userInfo.email === "") {
        setInputErrors((prevState) => {
          return { ...prevState, email: true };
        });
      }
      if (userInfo.pw === "") {
        setInputErrors((prev) => {
          return { ...prev, pw: true };
        });
      }
      if (userInfo.pw !== userInfo.pw2) {
        setInputErrors((prev) => {
          return { ...prev, pw2: true };
        });
      }
      return;
    } else {
      try {
        await signUp(userInfo.email, userInfo.pw);
        setMessage({
          type: "success",
          content: (
            <>
              Account successfully created.
              <Link to="/login">Login here.</Link>
            </>
          ),
          auto: false,
        });
      } catch (e) {
      } finally {
        setShowMessage(true);
      }
    }
  };

  const handleInputChange = (e, { name, value }) => {
    if (value !== "" && inputErrors[name]) {
      setInputErrors((prev) => {
        return { ...prev, [name]: false };
      });
    }
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className={containerStyles}>
      {/* replace h3 with custom section component including image */}
      <h3>Create an account to get started</h3>
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
          placeholder="Enter a password"
          error={
            inputErrors.pw
              ? userInfo.pw.length < 6
                ? {
                    content: "Password must be at least 6 characters.",
                    pointing: "above",
                  }
                : { content: "Please enter a password.", pointing: "above" }
              : null
          }
          value={userInfo.pw}
          onChange={handleInputChange}
        />
        <Form.Input
          name="pw2"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          error={
            inputErrors.pw2
              ? { content: "Passwords do not match.", pointing: "above" }
              : null
          }
          value={userInfo.pw2}
          onChange={handleInputChange}
        />
        <Form.Button onClick={handleClick}>Create Account</Form.Button>
      </Form>
      <span>
        Already have an account? <Link to="/login">Log in.</Link>
      </span>
    </div>
  );
};

export default SignUp;
