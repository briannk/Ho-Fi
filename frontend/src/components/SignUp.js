import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";
import { useAuthContext } from "../contexts/AuthContext";

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

  const [message, setMessage] = useState();

  const { signUp } = useAuthContext();

  const containerStyles = `container mx-auto max-w-sm border-4
     rounded m-4 p-4`;
  const formStyles = ``;

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
      console.log(inputErrors);
      if (userInfo.pw === "") {
        setInputErrors((prevState) => {
          return { ...prevState, pw: true };
        });
      }
      if (userInfo.pw !== userInfo.pw2) {
        setInputErrors((prevState) => {
          return { ...prevState, pw2: true };
        });
      }
      return;
    } else {
      //submit
      console.log("success");
      const resp = await signUp(userInfo.email, userInfo.pw);
      setMessage(
        <Message
          color={resp.success ? "green" : "red"}
          content={resp.message}
        />
      );
      console.log(resp);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value !== "" && inputErrors[e.target.name]) {
      setInputErrors({ ...inputErrors, [e.target.name]: false });
    }

    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    console.log("userInfo: ", userInfo);
  };

  return (
    <div className={containerStyles}>
      {message}
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
              ? { content: "Please enter a password.", pointing: "above" }
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
