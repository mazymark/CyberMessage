import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function PageNotFound({ currentUser, setCurrentUser }) {
  return (
    <>
      <div>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <h1 className="posts-header">Page Not Found</h1>
        <h1>404 - Page Not Found, redirect</h1>
      </div>
      <Footer />
    </>
  );
}
