import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { auth, provider } from "../config/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ currentUser, setCurrentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [auth, setCurrentUser]);

  async function handleSignOut() {
    try {
      await signOut(auth, provider);
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <header>
        <Logo />
        <div className="links">
          {currentUser && (
            <NavLink to="/send-message" className="send-message-button">
              SEND MESSAGE
            </NavLink>
          )}
          {!currentUser && (
            <NavLink to="/login" className="login-button">
              LOGIN
            </NavLink>
          )}
          {!currentUser && (
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? "nav-link isActive" : "nav-link"
              }
            >
              REGISTER
            </NavLink>
          )}
          {currentUser && (
            <NavLink
              to="/my-messages"
              className={({ isActive }) =>
                isActive ? "nav-link isActive" : "nav-link"
              }
            >
              MY MESSAGES
            </NavLink>
          )}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link isActive" : "nav-link"
            }
          >
            ABOUT
          </NavLink>

          {currentUser && (
            <button className="logout-button" onClick={handleSignOut}>
              <div className="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
            </button>
          )}
        </div>
        <FontAwesomeIcon
          onClick={() => setIsOpen((prev) => !prev)}
          className="menu-icon"
          icon={faBars}
        />
      </header>
      {isOpen && (
        <div className="navbar-collapse">
          <div className="navbar-collapse-links">
            {currentUser && (
              <NavLink to="/send-message" className="send-message-button">
                SEND MESSAGE
              </NavLink>
            )}
            {!currentUser && (
              <NavLink to="/login" className="login-button">
                LOGIN
              </NavLink>
            )}
            {!currentUser && (
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "nav-link isActive" : "nav-link"
                }
              >
                REGISTER
              </NavLink>
            )}
            {currentUser && (
              <NavLink
                to="/my-messages"
                className={({ isActive }) =>
                  isActive ? "nav-link isActive" : "nav-link"
                }
              >
                MY MESSAGES
              </NavLink>
            )}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link isActive" : "nav-link"
              }
            >
              ABOUT
            </NavLink>
            {currentUser && (
              <button className="logout-button" onClick={handleSignOut}>
                <div className="sign">
                  <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
