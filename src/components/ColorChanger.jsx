import React, { useContext } from "react";
import { SketchPicker } from "react-color";
import { PageContext } from "../context/PageContext";

const ColorChanger = () => {
  const pageContext = useContext(PageContext);

  const handleChangeComplete = (color, event) => {
    pageContext.setShirtColor(color.hex);
  };

  return (
    <div className="colorPickerContainer">
      <SketchPicker
        color={pageContext.shirtColor}
        onChange={handleChangeComplete}
      />
    </div>
  );
};

export default ColorChanger;
