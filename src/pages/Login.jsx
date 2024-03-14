import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login({ setCurrentUser, currentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
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

  async function handleSignInWithGoogle(e) {
    e.preventDefault();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err.message);
    }
    navigate("/");
  }

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      setLoginError(true);
      console.error(err.message);
    }
  }

  return (
    <>
      <div>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <h1 className="posts-header">Login</h1>

        <form className="form" onSubmit={handleSignIn}>
          <p id="heading">Login with existing account or Google account</p>

          <div className="field">
            <svg
              className="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              placeholder="Email"
              className="input-field"
              type="email"
              required
            />
          </div>

          <div className="field">
            <svg
              className="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input-field"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          {loginError && (
            <p style={{ color: "red" }}>
              Password/Email is not correct, try again
            </p>
          )}
          <div className="btn">
            <button className="button1">Login</button>
            <Link to="/register">
              <button className="button2">Create New Account</button>
            </Link>
          </div>
          <button
            type="button"
            onClick={handleSignInWithGoogle}
            className="login-with-google-btn"
          >
            Sign in with Google
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}
