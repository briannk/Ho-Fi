import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMsgContext } from "../../contexts/MsgContext";

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

  const { sendResetEmail } = useAuthContext();

  const { setMessage, setShowMessage } = useMsgContext();

  const containerStyles = `container mx-auto max-w-sm border-4
     rounded m-4 p-4`;

  const sendCode = async (e) => {
    if (userInfo.email === "") {
      setInputErrors({ ...inputErrors, email: true });
      return;
    } else {
      try {
        await sendResetEmail(userInfo.email);
        setMessage({
          type: "info",
          content: "A reset link has been sent to the specified e-mail.",
        });
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
    </div>
  );
};

export default PwReset;
