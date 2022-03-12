import React, { useEffect, useState } from "react";
import { Message } from "semantic-ui-react";
import { useMsgContext } from "../../contexts/MsgContext";
import dismiss from "../../utilities/dismiss";

// wrapper for Message component that is dismissable
// and automatically dismisses after 5 seconds

const DMessage = ({ type, header, content, handleDismiss, auto = true }) => {
  const [messageType, setMessageType] = useState({
    info: false,
    warning: false,
    success: false,
    error: false,
  });
  const [visible, setVisible] = useState(true);

  const { setShowMessage } = useMsgContext();

  useEffect(() => {
    switch (type) {
      case "warning":
        setMessageType((prev) => {
          return { ...prev, warning: true };
        });
        break;
      case "success":
        setMessageType((prev) => {
          return { ...prev, success: true };
        });
        break;
      case "error":
        setMessageType((prev) => {
          return { ...prev, error: true };
        });
        break;
      default:
      case "info":
        setMessageType((prev) => {
          return { ...prev, info: true };
        });
    }
    // dim then dismiss
    if (auto) {
      setTimeout(() => {
        setVisible(false);
      }, 4000);
      dismiss(setShowMessage);
    }
  }, []);
  return (
    <div
      className={`z-903 fixed p-4 w-full flex justify-center transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Message
        success={messageType.success}
        error={messageType.error}
        warning={messageType.warning}
        info={messageType.info}
        header={header}
        content={content}
        onDismiss={() => {
          setShowMessage(false);
        }}
        size="huge"
        className="flex justify-center w-full md:w-1/2 "
      />
    </div>
  );
};

export default DMessage;
