import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, useState } from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import SendMessage from "./pages/SendMessage";
const MyMessages = React.lazy(() => import("./pages/MyMessages"));

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          {currentUser && (
            <Route
              path="send-message"
              element={
                <SendMessage
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          )}
          <Route
            path="login"
            element={
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="register"
            element={
              <Register
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          {currentUser && (
            <Route
              path="my-messages"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MyMessages
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                  />
                </Suspense>
              }
            />
          )}
          <Route
            path="about"
            element={
              <About
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />

          <Route
            path="*"
            element={
              <PageNotFound
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
