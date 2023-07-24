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
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Home;
