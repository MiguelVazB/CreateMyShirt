import React, { useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageContext } from "../context/PageContext";
import CustomizationMenu from "../components/CustomizationMenu";
import "./Customizer.css";

import { fadeAnimation, slideAnimation } from "../utils/animations";

const Customizer = () => {
  const pageContext = useContext(PageContext);
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
                src="./toggleLogo.png"
                alt="toggle Logo"
                title="Toggle Shirt Logo on/off"
                className={
                  pageContext.isLogoTexture ? "tabImgSelected" : "tabImg"
                }
                onClick={() => {
                  pageContext.setIsLogoTexture((prev) => !prev);
                }}
              />
              <img
                src="./toggleFull.png"
                alt="toggle Full logo in shirt"
                title="Toggle Full Shirt Logo on/off"
                className={
                  pageContext.isFullTexture ? "tabImgSelected" : "tabImg"
                }
                onClick={() => {
                  pageContext.setIsFullTexture((prev) => !prev);
                }}
              />
              <img
                src="./toggleText.png"
                alt="toggle text in shirt"
                title="Toggle Shirt Text on/off"
                className={
                  pageContext.isTextOverlay ? "tabImgSelected" : "tabImg"
                }
                onClick={() => {
                  pageContext.setIsTextOverlay((prev) => !prev);
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
