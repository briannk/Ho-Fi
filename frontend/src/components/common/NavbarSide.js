import React from "react";
import { Sidebar, Menu } from "semantic-ui-react";
import "../../stylesheets/sidebar.css";
import { Link } from "react-router-dom";
import UserCard from "../user/UserCard";
import AddEntry from "./AddEntry";

const NavbarSide = ({ showNav, setShowNav, showModal, setShowModal }) => {
  return (
    <Sidebar
      as={Menu}
      borderless
      animation="overlay"
      icon="labeled"
      onHide={() => setShowNav(false)}
      vertical
      visible={showNav}
      width="wide"
      className="navBar lg:hidden"
      floated="right"
    >
      <Menu.Item>
        <div className="flex flex-col gap-4">
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
        <AddEntry showModal={showModal} setShowModal={setShowModal} />
      </Menu.Item>
      <Menu.Item>
        <UserCard />
      </Menu.Item>
    </Sidebar>
  );
};

export default NavbarSide;
