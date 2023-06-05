import React from "react";
import { AiFillHome } from "react-icons/ai";
import notfound from "../../assets/404.gif";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <img className="block mx-auto" src={notfound} alt="" />
      <Link
        to="/"
        className="bg-gradient-to-r from-[#835D23] to-[#B58130] text-white font-inter pe-2 font-bold text-2xl rounded-lg items-center w-fit flex gap-2 mx-auto"
      >
        <button className="p-3">Back To Home </button>
        <AiFillHome />
      </Link>
    </div>
  );
};

export default NotFound;
