import React, { useContext } from "react";
import { HexColorPicker } from "react-colorful";
import { PageContext } from "../context/PageContext";

const ColorChanger = () => {
  const pageContext = useContext(PageContext);

  return (
    <div className="colorPickerContainer">
      <HexColorPicker
        color={pageContext.shirtColor}
        onChange={pageContext.setShirtColor}
      />
    </div>
  );
};

export default ColorChanger;
