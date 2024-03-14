import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomePage({ currentUser, setCurrentUser }) {
  const [allPosts, setAllPosts] = useState([]);
  const [showAllMessages, setShowAllMessages] = useState(false);

  useEffect(() => {
    const messagesCollection = collection(db, "messages");
    const q = query(messagesCollection, orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllPosts(updatedData);
    });

    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    AOS.init();
  }, [db]);

  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <video
        preload="auto"
        autoPlay
        muted
        loop
        id="background-video"
        playsInline
        controls={false}
      >
        <source src="/images/Glitch.mp4" type="video/mp4" />
      </video>

      <div className="top-section">
        {allPosts.length > 1 && showAllMessages && (
          <button
            data-aos="fade-down"
            data-aos-duration="1000"
            className="not-show-messages-button yellow-button"
            onClick={() => setShowAllMessages(false)}
          >
            Show Less Messages
          </button>
        )}
        {!currentUser && (
          <h3
            className="reminder-message typing-effect"
            style={{ color: "#20dfa1" }}
          >
            _Login or Register to Post a Message_
          </h3>
        )}
      </div>

      {allPosts.length > 0 && showAllMessages ? (
        <div id="message-wrapper" data-aos="fade-up" data-aos-duration="2000">
          {allPosts?.map((post) => (
            <div className="message-box" key={post.id}>
              <div className="profile">
                <img
                  className="message-image"
                  src={post?.icon || "/images/icon.webp"}
                  alt="Message Image"
                />
                <h4 className="user-name">@{post.username}</h4>
                <h3 className="user-message">{post.message}</h3>
                <h6 className="timestamp">{post.date}</h6>
              </div>
            </div>
          ))}
        </div>
      ) : (
        allPosts.length > 0 &&
        !showAllMessages && (
          <div id="message-wrapper" data-aos="fade-up" data-aos-duration="2000">
            <div className="message-box" key={allPosts[0]?.id}>
              <div className="profile">
                <img
                  className="message-image"
                  src={allPosts[0]?.icon || "/images/icon.webp"}
                  alt="Message Image"
                />
                <h4 className="user-name">@{allPosts[0]?.username}</h4>
                <h3 className="user-message">{allPosts[0]?.message}</h3>
                <h6 className="timestamp">{allPosts[0]?.date}</h6>
              </div>
            </div>
          </div>
        )
      )}
      {allPosts.length > 1 && !showAllMessages && (
        <button
          data-aos="fade-up"
          data-aos-duration="1500"
          className="show-messages-button yellow-button"
          onClick={() => setShowAllMessages(true)}
        >
          Show More Messages
        </button>
      )}

      <Footer />
    </>
  );
}
