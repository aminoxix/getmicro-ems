import React from "react";
import "./Dashboard.css";
import MicroLogo from "../../img/logo.png";

export default function Dashboard() {
  return (
    <>
      <div>
        <img className="micro-logo" src={MicroLogo} alt="micro official logo" />
      </div>
    </>
  );
}
