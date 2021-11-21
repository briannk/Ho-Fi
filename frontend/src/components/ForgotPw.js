import React, { useState } from "react";

const ForgotPw = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const containerStyles = `container mx-auto max-w-sm border-4
     rounded m-4 p-4`;

  const handleClick = async () => {
    if (email === "") {
      setError(true);
    }
  };

  return <div></div>;
};

export default ForgotPw;
