import React, { useState } from "react";
import ReactDOM from "react-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sidebar">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"} Sidebar
      </button>
      <ul>
        <li>
          <a href="#">Dashboard</a>
        </li>
        <li>
          <a href="#">Students</a>
        </li>
        <li>
          <a href="#">Assignments</a>
        </li>
        <li>
          <a href="#">Resources</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
