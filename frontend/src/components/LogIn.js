import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { useAuthContext } from "../contexts/AuthContext";

const LogIn = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    pw: "",
  });
  const [inputErrors, setInputErrors] = useState({
    email: false,
    pw: false,
  });

  const { logIn } = useAuthContext();

  const containerStyles = `container mx-auto max-w-sm border-4
     rounded m-4 p-4`;

  console.log(userInfo);
  console.log("errors ", inputErrors);

  const handleClick = async () => {
    if (userInfo.email === "" || userInfo.pw === "") {
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
      return;
    } else {
      //submit
      console.log("success");
      const resp = await logIn(userInfo.email, userInfo.pw);
      console.log(resp);
    }
  };

  // // semantic docs style
  // const handleInputChange = (e, { name, value }) => {
  //   setUserInfo({ ...userInfo, [name]: value });
  //   console.log("userInfo: ", userInfo);
  // };

  // react docs style
  const handleInputChange = (e) => {
    if (e.target.value !== "" && inputErrors[e.target.name] === true) {
      setInputErrors({ ...inputErrors, [e.target.name]: false });
    }

    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    console.log("userInfo: ", userInfo);
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
        <Form.Button onClick={handleClick}>Log In</Form.Button>
      </Form>
      <span>
        Don't have an account? <Link to="/signup">Sign Up.</Link>
      </span>
    </div>
  );
};

export default LogIn;
