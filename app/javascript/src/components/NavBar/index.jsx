import React from "react";
import NavItem from "./NavItem";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";
import authApi from "apis/auth";
import { resetAuthTokens } from "apis/axios";
import { Link } from "react-router-dom";
import { logger } from "common/logger";

const NavBar = ({ isLoggedIn }) => {
  const userName = getFromLocalStorage("authUserFirstName");

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userFirstName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <NavItem name="Polly" path="/" />
            </div>
          </div>
          <div className="flex items-center justify-end">
            {isLoggedIn ? (
              <>
                <span
                  className="inline-flex items-center px-2 pt-1 text-sm font-regular leading-5 text-bb-gray-600
                          text-opacity-50 transition duration-150 ease-in-out border-b-2 border-transparent focus:outline-none
                          focus:text-bb-gray-700"
                >
                  {userName}
                </span>
                <a
                  onClick={handleLogout}
                  className="inline-flex items-center px-1 pt-1 text-sm
              font-semibold leading-5 text-bb-gray-600 text-opacity-50
              transition duration-150 ease-in-out border-b-2
              border-transparent hover:text-bb-gray-600 focus:outline-none
              focus:text-bb-gray-700 cursor-pointer"
                >
                  Logout
                </a>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-1 pt-1 text-sm
                  transition duration-150 ease-in-out border-b-2
                  font-semibold leading-5 text-bb-gray-600 text-opacity-50
                border-transparent hover:text-bb-gray-600 focus:outline-none
                focus:text-bb-gray-700 cursor-pointer"
              >
                LogIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
