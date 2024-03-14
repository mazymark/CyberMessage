import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div>
      <Link to="/" className="logo">
        <h3>CyberMessage</h3>
      </Link>
    </div>
  );
}
