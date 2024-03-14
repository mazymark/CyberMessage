// React Component
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About({ currentUser, setCurrentUser }) {
  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <h1 className="posts-header">About</h1>
      <div className="about-wrapper">
        <div className="about-text-content">
          <h1>Who Are We?</h1>
          <p>
            CyberMessage is your neon-soaked gateway to a world where messaging
            transcends mere text, evolving into an electric symphony as vibrant
            as the cityscapes we fantasize about. Nestled in the digital core of
            a futuristic metropolis, your messages zip through the data streams,
            connecting with the voices of dreamers, rebels, and visionaries.
            Together, we're not just chatting; we're forging a new digital dawn,
            one pixel, one message at a time.
          </p>
        </div>
        <img
          className="about-image"
          src="/images/aboutImage.webp"
          alt="CyberConnect world illustration"
        />
      </div>
      <Footer />
    </>
  );
}
