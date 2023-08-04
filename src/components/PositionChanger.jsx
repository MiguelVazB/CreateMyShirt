import React from "react";
import { PageContext } from "../context/PageContext";

const PositionChanger = ({
  minX,
  maxX,
  minY,
  maxY,
  step = 0.01,
  minSize,
  maxSize,
  minRot = 0,
  maxRot = 6.3,
}) => {
  const pageContext = React.useContext(PageContext);

  function handleChange(event) {
    let updatedValue = Number(event.target.value);
    pageContext.setTextPos((prev) => {
      return {
        ...prev,
        [event.target.name]: updatedValue,
      };
    });
  }

  return (
    <div className="positionChanger">
      <div className="xPositionChanger">
        <label htmlFor="positionX">X Position:</label>
        <div className="inputChangers">
          <input
            type="range"
            id="positionX"
            name="x"
            min={minX}
            max={maxX}
            step={step}
            value={pageContext.textPos.x}
            onChange={handleChange}
          />
          <input
            id="positionX"
            name="x"
            type="number"
            min={minX}
            max={maxX}
            step={step}
            value={pageContext.textPos.x}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="yPositionChanger">
        <label htmlFor="positionY">Y Position:</label>
        <div className="inputChangers">
          <input
            type="range"
            id="positionY"
            name="y"
            min={minY}
            max={maxY}
            step={step}
            value={pageContext.textPos.y}
            onChange={handleChange}
          />
          <input
            id="positionY"
            name="y"
            type="number"
            min={minY}
            max={maxY}
            step={step}
            value={pageContext.textPos.y}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="sizeChange">
        <label htmlFor="size">Size:</label>
        <div className="inputChangers">
          <input
            type="range"
            id="size"
            name="size"
            min={minSize}
            max={maxSize}
            step={step}
            value={pageContext.textPos.size}
            onChange={handleChange}
          />
          <input
            id="size"
            type="number"
            name="size"
            min={minSize}
            max={maxSize}
            step={step}
            value={pageContext.textPos.size}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="rotationChange">
        <label htmlFor="rotation">Rotation:</label>
        <div className="inputChangers">
          <input
            type="range"
            id="rotation"
            name="rotation"
            min={minRot}
            max={maxRot}
            step={step}
            value={pageContext.textPos.rotation}
            onChange={handleChange}
          />
          <input
            id="rotation"
            className="numberInput"
            type="number"
            name="rotation"
            min={minRot}
            max={maxRot}
            step={step}
            value={pageContext.textPos.rotation}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PositionChanger;
