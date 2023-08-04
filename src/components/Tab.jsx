import React from "react";

const Tab = ({ tab, handleClick }) => {
  return (
    <div className="tab" onClick={handleClick} title={`${tab} changer`}>
      <img src={`${tab}.png`} alt={`${tab} changer`} />
    </div>
  );
};

export default Tab;
