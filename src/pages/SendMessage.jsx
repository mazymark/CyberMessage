import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function SendMessage({ currentUser, setCurrentUser }) {
  const [username, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [iconError, setIconError] = useState(false);
  const navigate = useNavigate();

  async function handleAddMessage(e) {
    e.preventDefault();

    if (message.length <= 3) {
      setMessageError(true);
      return;
    }

    if (!icon) {
      setIconError(true);
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        message,
        username,
        icon,
        date: new Date().toLocaleDateString(),
        time: new Date(),
        uid: currentUser.uid,
      });

      setMessage("");
      setUserName("");
      setMessageError(false);
      setIconError(false);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  function handleSelectedIcon(selectedIcon) {
    setIcon(selectedIcon);
  }

  return (
    <>
      <div>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <h1 className="posts-header">Send Message</h1>

        <form className="form-send-message" onSubmit={handleAddMessage}>
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
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="off"
              placeholder="Your name"
              className="input-field"
              type="text"
              required
            />
          </div>
          <div className="field">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              cols="30"
              rows="10"
              required
            ></textarea>
          </div>
          {messageError && (
            <p style={{ color: "red" }}>
              Message should at least have 4 characters!
            </p>
          )}
          {iconError && <p style={{ color: "red" }}>Select an icon!</p>}
          <p className="select-icon">Select your icon:</p>
          <div className="icons">
            <img
              style={{
                border: icon === "images/icon.webp" ? "1px solid #1bfd9c" : "",
              }}
              onClick={() => handleSelectedIcon("images/icon.webp")}
              className="icon"
              src="images/icon.webp"
              alt="icon"
            />
            <img
              style={{
                border: icon === "images/icon2.webp" ? "1px solid #1bfd9c" : "",
              }}
              onClick={() => handleSelectedIcon("images/icon2.webp")}
              className="icon"
              src="images/icon2.webp"
              alt="icon"
            />
            <img
              style={{
                border: icon === "images/icon3.webp" ? "1px solid #1bfd9c" : "",
              }}
              onClick={() => handleSelectedIcon("images/icon3.webp")}
              className="icon"
              src="images/icon3.webp"
              alt="icon"
            />
            <img
              style={{
                border: icon === "images/icon4.webp" ? "1px solid #1bfd9c" : "",
              }}
              onClick={() => handleSelectedIcon("images/icon4.webp")}
              className="icon"
              src="images/icon4.webp"
              alt="icon"
            />
            <img
              style={{
                border: icon === "images/icon5.webp" ? "1px solid #1bfd9c" : "",
              }}
              onClick={() => handleSelectedIcon("images/icon5.webp")}
              className="icon"
              src="images/icon5.webp"
              alt="icon"
            />
            <img
              style={{
                border: icon === "images/icon6.webp" ? "1px solid #1bfd9c" : "",
              }}
              onClick={() => handleSelectedIcon("images/icon6.webp")}
              src="images/icon6.webp"
              alt="icon"
              className="icon"
            />
          </div>
          <div className="btn">
            <button className="button1 send-button">Send</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
