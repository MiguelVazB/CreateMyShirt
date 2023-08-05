import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageContext } from "../context/PageContext";
import "./Home.css";

import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../utils/animations";

const Home = () => {
  const pageContext = React.useContext(PageContext);
  return (
    <AnimatePresence>
      {pageContext.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img
              src="./threejsLogo.png"
              alt="threejs logo"
              className="threejsLogo"
            />
          </motion.header>

          <motion.div
            className="homePageContentContainer"
            {...headContainerAnimation}
          >
            <motion.div className="headTextContainer" {...headTextAnimation}>
              <h1 className="headText">
                Start Creating <br /> Your Dream Shirt!
              </h1>
            </motion.div>

            <motion.div
              className="descriptionContainer"
              {...headContentAnimation}
            >
              <p className="description">
                <strong>Unleash your Inner Fashion Designer</strong> and
                transform the style of your 3D shirt with our customization
                tool. Get ready to experience fashion in a whole new dimension.
                Are you ready to make a statement with <strong>YOUR</strong>{" "}
                Style?
              </p>

              <button
                className="createButton"
                onClick={() =>
                  pageContext.setIntroFunc((prev) => (prev = false))
                }
              >
                Create My Shirt
              </button>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
