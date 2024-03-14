import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function MyMessages({ currentUser, setCurrentUser }) {
  const [userPosts, setUserPosts] = useState([]);
  const [updateMessage, setUpdateMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    const messagesCollection = collection(db, "messages");
    const q = query(messagesCollection, where("uid", "==", currentUser.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserPosts(newPosts);
    });

    return () => unsubscribe();
  }, [currentUser.uid]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    });
  }, []);

  async function handleDeleteMessage(id) {
    try {
      await deleteDoc(doc(db, "messages", id));
    } catch (err) {
      console.error("Error deleting message:", err.message);
    }
  }

  async function handleUpdateMessage(e) {
    e.preventDefault();
    if (!currentItem) return;
    if (updateMessage.length < 3) return;
    const updateMessageDoc = doc(db, "messages", currentItem.id);
    await updateDoc(updateMessageDoc, { message: updateMessage });
    setUpdateMessage("");
    setIsOpen(false);
  }

  function openUpdateMessageField(message) {
    setIsOpen(true);
    setCurrentItem(message);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  return (
    <>
      <>
        {isOpen && (
          <>
            <div className="overlay"></div>
            <div className="update-modal">
              <input
                className="update-message-input"
                type="text"
                placeholder="Update your message here..."
                value={updateMessage}
                onChange={(e) => setUpdateMessage(e.target.value)}
              />

              <button
                onClick={handleUpdateMessage}
                className="update-message-button"
              >
                Update
              </button>
              <FontAwesomeIcon
                className="close-modal"
                icon={faCircleXmark}
                onClick={handleCloseModal}
              />
            </div>
          </>
        )}
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <h1 className="posts-header">My Messages</h1>
        <div id="message-wrapper">
          {userPosts.length === 0 && <div className="loader"></div>}
          {userPosts.map((message) => (
            <div className="message-box my-messages-box" key={message.id}>
              <div className="profile">
                <img
                  className="message-image"
                  src={message.icon}
                  alt="Message Image"
                />
                <h4 className="user-name">@{message.username} </h4>
                <h3 className="user-message">{message.message}</h3>
                <h6 className="timestamp">{message.date}</h6>
              </div>
              <div className="update-delete-wrapper">
                <FontAwesomeIcon
                  className="update-icon"
                  icon={faPenToSquare}
                  onClick={() => openUpdateMessageField(message)}
                />

                <FontAwesomeIcon
                  className="delete-icon"
                  icon={faTrash}
                  onClick={() => handleDeleteMessage(message.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </>
      <Footer />
    </>
  );
}
