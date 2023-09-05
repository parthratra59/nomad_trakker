import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className=" ">
      <div className="h-[calc(100vh-3.5rem)] m-auto flex items-center justify-center w-11/12 max-w-[1080px]">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Spinner;
