import React, { useState } from "react";
import { Form, Message } from "semantic-ui-react";
import { useAuthContext } from "../contexts/AuthContext";

const PwReset = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    pw: "",
    pw2: "",
    code: "",
  });
  const [inputErrors, setInputErrors] = useState({
    email: false,
    pw: false,
    pw2: false,
    code: false,
  });
  const [showResetForm, setShowResetForm] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);
  const [message, setMessage] = useState();

  const { sendResetEmail, verifyCode, resetPassword } = useAuthContext();

  const containerStyles = `container mx-auto max-w-sm border-4
     rounded m-4 p-4`;

  const sendCode = async (e) => {
    if (userInfo.email === "") {
      setInputErrors({ ...inputErrors, email: e.target.value });
      return;
    } else {
      // send verification
      const resp = await sendResetEmail(userInfo.email);
      setMessage(
        <Message content="A reset link has been sent to your e-mail." />
      );
      setShowResetForm(true);
      // setMessage(false);
    }
  };

  const checkCode = async (e) => {
    if (userInfo.code === "") {
      setInputErrors({ ...inputErrors, code: e.target.value });
      return;
    } else {
      // check code before showing reset form
      try {
        // await verifyCode(userInfo.code);
        setIsValidCode(true);
      } catch (error) {
        // set error message
      }
    }
  };

  const completeReset = async (e) => {
    if (userInfo.pw === "" || userInfo.pw !== userInfo.pw2) {
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
      // reset password
      // const resp = await resetPassword(userInfo.code, userInfo.pw);
      setMessage(<Message content="Password reset successfully." />);
      // console.log(resp);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value !== "" && inputErrors[e.target.name] === true) {
      setInputErrors({ ...inputErrors, [e.target.name]: false });
    }

    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className={containerStyles}>
      {message}
      {showResetForm ? (
        isValidCode ? (
          <>
            <h3>Enter a new password</h3>
            <Form className="my-4">
              <Form.Input
                name="pw"
                type="password"
                label="Password"
                placeholder="Enter a new password"
                error={
                  inputErrors.pw
                    ? {
                        content: "Please enter a new password.",
                        pointing: "above",
                      }
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
              <Form.Button onClick={completeReset}>Reset Password</Form.Button>
            </Form>
          </>
        ) : (
          <>
            <h3>Enter the verification code:</h3>
            <Form className="my-4">
              <Form.Input
                name="code"
                type="text"
                placeholder="Enter the verification code"
                error={
                  inputErrors.code
                    ? {
                        content: "Please enter the verification code.",
                        pointing: "above",
                      }
                    : null
                }
                value={userInfo.code}
                onChange={handleInputChange}
              />
              <Form.Button onClick={checkCode}>Next</Form.Button>
            </Form>
          </>
        )
      ) : (
        <>
          <h3>Enter the e-mail address associated with the account.</h3>
          <Form className="my-4">
            <Form.Input
              name="email"
              label="E-mail"
              placeholder="Enter your e-mail"
              error={
                inputErrors.email
                  ? {
                      content: "Please enter a valid e-mail.",
                      pointing: "above",
                    }
                  : null
              }
              value={userInfo.email}
              onChange={handleInputChange}
            />

            <Form.Button onClick={sendCode}>Send Code</Form.Button>
          </Form>
        </>
      )}
    </div>
  );
};

export default PwReset;
