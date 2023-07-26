import React, { useEffect, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageContext } from "../context/PageContext";
import "./Customizer.css";

import {
  fadeAnimation,
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../utils/animations";

const Customizer = () => {
  const pageContext = useContext(PageContext);
  return (
    <AnimatePresence>
      {!pageContext.intro && (
        <>
          <motion.div key="customize" {...slideAnimation("left")}>
            <div className="custom-tab">
              <div>Color Changer</div>
              <div>Logo Changer</div>
              <div>AI Helper</div>
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

          <motion.div {...slideAnimation("up")}>
            <div className="customToggles">
              <div>Color Changer</div>
              <div>Logo Changer</div>
              <div>AI Helper</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
