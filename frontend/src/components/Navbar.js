import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Header } from "semantic-ui-react";
import UserCard from "./UserCard";

const Navbar = () => {
  const navStyles = `container mx-auto p-4 m-4 max-w-max border-4`;
  const [showModal, setShowModal] = useState(false);
  return (
    <nav className={navStyles}>
      {/* likely to have the logo separate from the nav to allow Sidebar usage*/}
      <Button as={Link} to="/" content="Home" />
      <Modal
        onClose={() => setShowModal(false)}
        onOpen={() => setShowModal(true)}
        open={showModal}
        trigger={<Button content="Add Expense/Income" />}
      >
        <Modal.Content className="w-maxcontent">
          <Button
            as={Link}
            to="/expenses/add"
            content="Add Expense"
            onClick={() => {
              setShowModal(false);
            }}
          />
          <Button
            as={Link}
            to="/income/add"
            content="Add Income"
            onClick={() => {
              setShowModal(false);
            }}
          />
        </Modal.Content>
      </Modal>
      <UserCard />
    </nav>
  );
};

export default Navbar;
