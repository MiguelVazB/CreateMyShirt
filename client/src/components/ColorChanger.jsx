import React, { useContext } from "react";
import { HexColorPicker } from "react-colorful";
import { PageContext } from "../context/PageContext";

const ColorChanger = () => {
  const pageContext = useContext(PageContext);

  const handleChange = (color) => {
    pageContext.setShirtColor(color);
  };

  return (
    <div className="colorPickerContainer">
      <HexColorPicker
        color={pageContext.shirtColor}
        onChange={handleChange}
      />
    </div>
  );
};

export default ColorChanger;
