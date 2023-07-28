import React, { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageContext } from "../context/PageContext";
import "./Customizer.css";

import { fadeAnimation, slideAnimation } from "../utils/animations";

const Customizer = () => {
  const pageContext = useContext(PageContext);
  return (
    <AnimatePresence>
      {!pageContext.intro && (
        <>
          <motion.div className="customMenu" {...slideAnimation("left")}>
            <div className="custom-tab">
              <div>Color</div>
              <div>Logo</div>
              <div>AI</div>
            </div>
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
              <div>Color Changer</div>
              <div
                onClick={() => pageContext.setIsLogoTexture((prev) => !prev)}
              >
                Logo Changer
              </div>
              <div>AI Helper</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
