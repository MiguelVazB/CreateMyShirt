import React, { memo, useState, useEffect } from "react";
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
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [showSavedDesigns, setShowSavedDesigns] = useState(false);

  useEffect(() => {
    if (pageContext.intro) {
      setSavedDesigns(pageContext.getSavedDesigns());
    }
  }, [pageContext.intro]);

  const handleLoadDesign = (design) => {
    pageContext.loadDesign(design);
  };

  const handleDeleteDesign = (timestamp) => {
    pageContext.deleteDesign(timestamp);
    setSavedDesigns(pageContext.getSavedDesigns());
  };

  return (
    <AnimatePresence>
      {pageContext.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
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
              
              {savedDesigns.length > 0 && (
                <button
                  className="loadDesignsButton"
                  onClick={() => setShowSavedDesigns(!showSavedDesigns)}
                >
                  {showSavedDesigns ? 'Hide' : 'Load'} Saved Designs ({savedDesigns.length})
                </button>
              )}

              {showSavedDesigns && savedDesigns.length > 0 && (
                <motion.div 
                  className="savedDesignsList"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  {savedDesigns.map((design) => (
                    <div key={design.timestamp} className="savedDesignItem">
                      <div className="designInfo">
                        <strong>{design.name}</strong>
                        <small>{new Date(design.timestamp).toLocaleDateString()}</small>
                      </div>
                      <div className="designActions">
                        <button 
                          className="loadBtn"
                          onClick={() => handleLoadDesign(design)}
                        >
                          Load
                        </button>
                        <button 
                          className="deleteBtn"
                          onClick={() => handleDeleteDesign(design.timestamp)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default memo(Home);
