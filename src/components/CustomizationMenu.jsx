import React, { useContext } from "react";
import { PageContext } from "../context/PageContext";
import Tab from "./Tab";
import "./CustomizationMenu.css";

const CustomizationMenu = () => {
  const pageContext = useContext(PageContext);
  return (
    <div className="customTab">
      <Tab tab="Color" />
      <Tab tab="File" />
      <Tab tab="AI" />
    </div>
  );
};

export default CustomizationMenu;
