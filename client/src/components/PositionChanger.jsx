import React, { useState, useEffect, useCallback, memo } from "react";
import { PageContext } from "../context/PageContext";

const PositionChanger = memo(({
  minX = -0.08,
  maxX = 0.08,
  minY = -0.3,
  maxY = 0.18,
  step = 0.01,
  minSize = 0.05,
  maxSize = 1,
  minRot = 0,
  maxRot = 6.3,
  elementToPos = "text",
}) => {
  const pageContext = React.useContext(PageContext);
  
  // Local state for immediate UI updates
  const currentPos = elementToPos === "text" ? pageContext.textPos : pageContext.logoPos;
  const [localPos, setLocalPos] = useState(currentPos);

  // Sync local state when context changes
  useEffect(() => {
    setLocalPos(currentPos);
  }, [currentPos]);

  // Debounced update to context (only updates after user stops sliding)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const setter = elementToPos === "text" ? pageContext.setTextPos : pageContext.setLogoPos;
      setter(localPos);
    }, 50); // 50ms debounce

    return () => clearTimeout(timeoutId);
  }, [localPos, elementToPos]);

  const handleChange = useCallback((event) => {
    const updatedValue = Number(event.target.value);
    setLocalPos((prev) => ({
      ...prev,
      [event.target.name]: updatedValue,
    }));
  }, []);

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
            value={localPos.x}
            onChange={handleChange}
          />
          <input
            id="positionX"
            name="x"
            type="number"
            min={minX}
            max={maxX}
            step={step}
            value={localPos.x}
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
            value={localPos.y}
            onChange={handleChange}
          />
          <input
            id="positionY"
            name="y"
            type="number"
            min={minY}
            max={maxY}
            step={step}
            value={localPos.y}
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
            value={localPos.size}
            onChange={handleChange}
          />
          <input
            id="size"
            type="number"
            name="size"
            min={minSize}
            max={maxSize}
            step={step}
            value={localPos.size}
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
            value={localPos.rotation}
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
            value={localPos.rotation}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
});

export default PositionChanger;
