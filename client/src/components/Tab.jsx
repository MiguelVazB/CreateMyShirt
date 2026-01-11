import React from "react";

const Tab = ({ tab, handleClick, isActive }) => {
  return (
    <div 
      className={`tab ${isActive ? 'tab-active' : ''}`} 
      onClick={handleClick} 
      title={`${tab} customization`}
    >
      <img src={`${tab}.png`} alt={`${tab} changer`} />
      <span className="tab-label">{tab}</span>
    </div>
  );
};

export default Tab;
