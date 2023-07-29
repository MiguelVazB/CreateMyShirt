import React from "react";

const Tab = ({ tab, isActive, handleClick }) => {
  return (
    <div className="tab">
      <img src={`${tab}.png`} />
    </div>
  );
};

export default Tab;
