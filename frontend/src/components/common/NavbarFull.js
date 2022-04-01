import React from "react";
import { Link } from "react-router-dom";
import logoLight from "../../assets/img/logo-light.svg";
import AddEntry from "./AddEntry";
import UserCard from "../user/UserCard";

const linkStyles =
  "h-full p-8 flex items-center text-white hover:bg-gray-800 transition-all duration-200";

const NavbarFull = ({ showModal, setShowModal }) => {
  return (
    <div className="hidden lg:flex h-32 fixed w-full top-0 left-0 fixed bg-gray-700 bg-opacity-100 bg-opacity-90 z-902 items-center px-8 gap-4">
      <div className="w-full h-full flex justify-between items-center">
        <Link to="/" className="inline-block">
          <img src={logoLight} alt="logo" className={"h-24 object-cover"} />
        </Link>
        <div className="flex w-full h-full text-3xl tracking-widest justify-center items-center xl:gap-4">
          <Link to="/expenses" className={linkStyles}>
            <span>Expenses</span>
          </Link>
          <Link to="/income" className={linkStyles}>
            <span>Income</span>
          </Link>
          <Link to="/budgeting" className={linkStyles}>
            <span>Budgeting</span>
          </Link>
        </div>
        <AddEntry showModal={showModal} setShowModal={setShowModal} />
      </div>
      <UserCard />
    </div>
  );
};

export default NavbarFull;
