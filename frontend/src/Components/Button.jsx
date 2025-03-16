import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, color, link }) => {
  return (
    <Link to={link}>
      <button
        className={`px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition text-white ${color}`}
      >
        {text}
      </button>
    </Link>
  );
};

export default Button;
