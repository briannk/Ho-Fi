import React, { useContext, useState } from "react";
import dismiss from "../utilities/dismiss";

const MsgContext = React.createContext();
const useMsgContext = () => {
  return useContext(MsgContext);
};

const MsgProvider = ({ children }) => {
  // since error message has flexible use, it is the default
  const [message, setMessage] = useState({
    type: "error",
    header: "",
    content: "Something went wrong! Please try again later.",
    auto: true,
  });
  const [showMessage, setShowMessage] = useState(false);

  const providerValue = {
    message,
    setMessage,
    showMessage,
    setShowMessage,
  };
  return (
    <MsgContext.Provider value={providerValue}>{children}</MsgContext.Provider>
  );
};

export { MsgProvider as default, useMsgContext };
