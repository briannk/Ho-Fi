import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import UserCard from "./UserCard";

const Navbar = () => {
  const navStyles = `container mx-auto p-4 m-4 max-w-max border-4`;
  return (
    <nav className={navStyles}>
      <UserCard />
    </nav>
  );
};

export default Navbar;
