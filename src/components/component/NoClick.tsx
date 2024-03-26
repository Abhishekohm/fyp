import React, { useEffect } from "react";

const NoClick = () => {
  useEffect(() => {
    console.log("Loading layout rendered");
  });
  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen z-50"
      onClick={() => {
        console.log("Loading component clicked");
      }}
    ></div>
  );
};

export default NoClick;
