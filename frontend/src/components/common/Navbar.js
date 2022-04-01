import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Sidebar, Segment, Icon } from "semantic-ui-react";
import "../../stylesheets/sidebar.css";
import logo from "../../assets/img/logo.svg";
import DMessage from "./DMessage";
import { useMsgContext } from "../../contexts/MsgContext";
import NavbarFull from "./NavbarFull";
import NavbarSide from "./NavbarSide";

const logoStyles =
  "h-24 m-4 object-cover filter brightness-100 hover:brightness-200";

const Navbar = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const { message, showMessage } = useMsgContext();
  return (
    <>
      {showMessage && (
        <DMessage
          content={message.content}
          type={message.type}
          auto={message.auto}
        />
      )}
      <div className="container fixed z-903 lg:hidden">
        <Button
          content={<Icon name="sidebar" fitted />}
          className={`toggleNav ${showNav ? "toggled" : ""}`}
          onClick={() => {
            setShowNav(true);
          }}
          onMouseDown={(e) => e.preventDefault()}
        />
      </div>
      <Sidebar.Pushable
        as={Segment}
        className="content"
        style={{ transform: "none" }}
      >
        <NavbarSide
          showNav={showNav}
          showModal={showModal}
          setShowModal={setShowModal}
          setShowNav={setShowNav}
        />
        <Sidebar.Pusher className="overflowVisible">
          <NavbarFull showModal={showModal} setShowModal={setShowModal} />
          <Link to="/" className="inline-block">
            <img
              src={logo}
              alt="logo"
              className={logoStyles + " block lg:hidden"}
            />
          </Link>
          <Segment className="noBorder lg:mt-32 z-1">{children}</Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

export default Navbar;
