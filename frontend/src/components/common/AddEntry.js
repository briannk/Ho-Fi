import React from "react";
import { Modal, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const AddEntry = ({ showModal, setShowModal }) => {
  return (
    <Modal
      onClose={() => setShowModal(false)}
      onOpen={() => setShowModal(true)}
      open={showModal}
      trigger={
        <Button
          content="Add Expense/Income"
          className="border-2 border-white hover:border-transparent text-white"
        />
      }
      size="mini"
      closeIcon
    >
      <Modal.Content className="choices">
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
  );
};

export default AddEntry;
