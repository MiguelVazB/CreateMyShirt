import React, { useContext, memo } from "react";
import { HexColorPicker } from "react-colorful";
import { PageContext } from "../context/PageContext";

const ColorChanger = memo(() => {
  const pageContext = useContext(PageContext);

  return (
    <div className="colorPickerContainer">
      <HexColorPicker
        color={pageContext.shirtColor}
        onChange={pageContext.setShirtColor}
      />
    </div>
  );
});

export default ColorChanger;
