import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  Header,
  Sidebar,
  Segment,
  Menu,
  Item,
  Icon,
} from "semantic-ui-react";
import UserCard from "./UserCard";
import "../stylesheets/sidebar.css";

const Navbar = ({ children }) => {
  // const navStyles = `container mx-auto p-4 m-4 max-w-max border-4`;
  const [showModal, setShowModal] = useState(false);
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      {/* likely to have the logo separate from the nav to allow Sidebar usage*/}
      <Button
        content={<Icon name="sidebar" fitted />}
        className="toggleNav"
        onClick={() => {
          setShowNav(true);
        }}
      />
      <Sidebar.Pushable as={Segment} className="content">
        <Sidebar
          as={Menu}
          borderless
          animation="overlay"
          icon="labeled"
          // inverted
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
          </Menu.Item>
          <Menu.Item>
            <UserCard />
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher className="overflowVisible">
          <Segment>{children}</Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

export default Navbar;
