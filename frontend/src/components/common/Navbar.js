import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Sidebar, Segment, Menu, Icon } from "semantic-ui-react";
import UserCard from "../user/UserCard";
import "../../stylesheets/sidebar.css";
import logo from "../../assets/img/logo.svg";
import DMessage from "./DMessage";
import { useMsgContext } from "../../contexts/MsgContext";

const logoStyles =
  "h-24 m-4 object-cover filter brightness-100 hover:brightness-200";

const Navbar = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const { message, showMessage } = useMsgContext();
  console.log(showMessage);
  return (
    <>
      <div className="container fixed z-902">
        {showMessage && (
          <DMessage
            content={message.content}
            type={message.type}
            auto={message.auto}
          />
        )}
        <Button
          content={<Icon name="sidebar" fitted />}
          className="toggleNav"
          onClick={() => {
            setShowNav(true);
          }}
        />
      </div>
      <Sidebar.Pushable
        as={Segment}
        className="content"
        style={{ transform: "none" }}
      >
        <Sidebar
          as={Menu}
          borderless
          animation="overlay"
          icon="labeled"
          onHide={() => setShowNav(false)}
          vertical
          visible={showNav}
          width="wide"
          className="navBar"
          floated="right"
        >
          <Menu.Item>
            <div>
              <Menu.Item
                as={Link}
                to="/"
                className="taller"
                onClick={() => setShowNav(false)}
              >
                Home
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/expenses"
                className="taller"
                onClick={() => setShowNav(false)}
              >
                Expenses
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/income"
                className="taller"
                onClick={() => setShowNav(false)}
              >
                Income
              </Menu.Item>
              <Menu.Item
                as={Link}
                to="/budgeting"
                className="taller"
                onClick={() => setShowNav(false)}
              >
                Budgeting
              </Menu.Item>
            </div>
          </Menu.Item>
          <Menu.Item>
            <Modal
              onClose={() => setShowModal(false)}
              onOpen={() => setShowModal(true)}
              open={showModal}
              trigger={<Button content="Add Expense/Income" />}
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
          </Menu.Item>
          <Menu.Item>
            <UserCard />
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher className="overflowVisible">
          <Link to="/" className="inline-block">
            <img src={logo} alt="logo" className={logoStyles} />
          </Link>
          <Segment className="noBorder">{children}</Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

export default Navbar;
