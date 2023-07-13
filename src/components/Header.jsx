import React from "react";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-6 mb-12 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>

        <div className="flex items-center gap-6"> 
          <Link className="hover:text-violet-900 transition" to="">Log In</Link>
          <Link className=" bg-violet-600 hover:bg-violet-800  text-white px-4 py-3 rounded-lg transition" to="">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
