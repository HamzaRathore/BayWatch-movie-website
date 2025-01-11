import React, { useState, useEffect } from "react";
import logo from "../assets/logo-2.png";
import usericon from "../assets/user.png";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { IoSearchOutline, IoHome } from "react-icons/io5";
import { navigation } from "./../constants/Navigation";

const Navbar = () => {
  const location = useLocation();
  const removeSpace = location.search.slice(3).split("m").join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace);
  const navigate = useNavigate();

  // console.log("location",location.search.slice(3));

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-50 z-40">
      <div className="container mx-auto px-3 h-full flex items-center">
        <Link to={"/"}>
          <img className="w-36 cursor-pointer h-20 " src={logo} alt="logo" />
        </Link>

        <nav className=" hidden lg:flex items-center gap-2 ml-6">
          {navigation.map((nav, index) => {
            return (
              <div key={nav.label}>
                <NavLink
                  className={({ isActive }) =>
                    `px-2 hover:text-neutral-100 ${
                      isActive && "text-neutral-100"
                    }`
                  }
                  to={nav.href}
                >
                  {nav.label}
                </NavLink>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-5">
          <form
            action=""
            className="flex items-center gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent px-4 py-1 text-lg outline-none shadow-sm hidden lg:block "
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white cursor-pointer">
              <IoSearchOutline />
            </button>
          </form>

          <div className="w-8 h-8 cursor-pointer rounded-full overflow-hidden active:scale-75 transition-all">
            <img className="w-full h-full" src={usericon} alt="user-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
