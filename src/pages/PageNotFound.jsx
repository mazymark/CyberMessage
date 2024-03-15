import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function PageNotFound({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 4000);
  }, []);
  return (
    <>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <h1 className="posts-header">404 - Page Not Found</h1>
      <p className="not-found">
        We apologize, but the page you are looking for cannot be found. It seems
        the page you're attempting to access does not exist or has been
        relocated.
        <br />
        <br />
        You will be redirected to the homepage shortly.
      </p>
      <Footer />
    </>
  );
}
