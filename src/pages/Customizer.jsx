import React, { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageContext } from "../context/PageContext";
import CustomizationMenu from "../components/CustomizationMenu";
import "./Customizer.css";

import { fadeAnimation, slideAnimation } from "../utils/animations";

const Customizer = () => {
  const pageContext = useContext(PageContext);

  const [tempColor, setTempColor] = useState();

  function toggleShirtColor() {
    // chocolate color in hex #427618
    if (pageContext.shirtColor !== "chocolate") {
      setTempColor(pageContext.shirtColor);
      pageContext.setShirtColor("chocolate");
    } else {
      pageContext.setShirtColor(tempColor);
    }
  }

  return (
    <AnimatePresence>
      {!pageContext.intro && (
        <>
          <motion.div
            style={{ position: "absolute", top: 0, left: 0, bottom: 0 }}
            {...slideAnimation("left")}
          >
            <CustomizationMenu />
          </motion.div>

          <motion.div {...fadeAnimation}>
            <button
              className="goBackButton"
              onClick={() => pageContext.setIntroFunc(true)}
            >
              Go Back
            </button>
          </motion.div>

          <motion.div
            className="customTogglesContainer"
            {...slideAnimation("up")}
          >
            <div className="customToggles">
              <img
                src="./toggleColor.png"
                alt="toggle Color"
                onClick={toggleShirtColor}
              />
              <img
                src="./toggleLogo.png"
                alt="toggle Logo"
                onClick={() => pageContext.setIsLogoTexture((prev) => !prev)}
              />
              <div>AI Helper</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
