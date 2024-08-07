import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import tournament from "../assets/tournament.png";
import notification from "../assets/notification.png";
import Dropdown from "../layouts/Dropdown";

function Navbar() {
  return (
    <nav className="flex justify-between bg-darkbg">
      <NavLink to="/">
        <div>
          <img className="w-[200px] h-[100px]" src={logo} alt="logo" />
        </div>
      </NavLink>
      <div className="flex w-[200px] h-[100px] justify-center items-center mr-10 gap-8">
        <div>
          <img
            src={notification}
            alt="notification"
            style={{ width: "45px", height: "45px" }}
          />
        </div>
        <NavLink to="/user/host">
          {/* Fix Pathing Later */}
          <div>
            <img
              src={tournament}
              alt="tour"
              style={{ width: "45px", height: "45px" }}
            />
          </div>
        </NavLink>
        <Dropdown />
      </div>
    </nav>
  );
}

export default Navbar;
