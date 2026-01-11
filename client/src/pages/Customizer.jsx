import React, { useContext, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageContext } from "../context/PageContext";
import CustomizationMenu from "../components/CustomizationMenu";
import "./Customizer.css";

import { fadeAnimation, slideAnimation } from "../utils/animations";

const Customizer = memo(() => {
  const pageContext = useContext(PageContext);
  const [showSaveDialog, setShowSaveDialog] = React.useState(false);
  const [designName, setDesignName] = React.useState('');
  const [designSaved, setDesignSaved] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  // Reset designSaved when any design property changes
  React.useEffect(() => {
    setDesignSaved(false);
  }, [
    pageContext.shirtColor,
    pageContext.textColor,
    pageContext.isFullTexture,
    pageContext.isLogoTexture,
    pageContext.isTextOverlay,
    pageContext.logoTexture,
    pageContext.textOverlay,
    pageContext.textPos,
    pageContext.logoPos,
    pageContext.generatedImage,
  ]);

  const handleSave = (override = false) => {
    const nameToSave = override ? pageContext.currentLoadedDesign.name : designName.trim();
    if (nameToSave) {
      const result = pageContext.saveDesign(nameToSave, override);
      if (result.success) {
        setDesignName('');
        setShowSaveDialog(false);
        setDesignSaved(true);
        alert(result.overridden ? 'Design updated successfully!' : 'Design saved successfully!');
      } else if (result.error === 'duplicate') {
        setErrorMessage('A design with this name already exists!');
      } else if (result.error === 'quota') {
        setErrorMessage('Storage quota exceeded! Try deleting some old designs or use smaller images.');
      } else if (result.error === 'limit') {
        setErrorMessage('Maximum 10 designs allowed. Please delete some old designs first.');
      } else {
        setErrorMessage('Failed to save design. Please try again.');
      }
    }
  };

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
            <button
              className="saveDesignButton"
              onClick={() => {
                setShowSaveDialog(true);
                setErrorMessage('');
              }}
              disabled={designSaved}
              title={designSaved ? 'Design already saved' : 'Save your design'}
            >
              {designSaved ? '✓ Saved' : 'Save Design'}
            </button>
          </motion.div>

          {showSaveDialog && (
            <motion.div 
              className="saveDialog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="saveDialogContent">
                <h3>Save Your Design</h3>
                {pageContext.currentLoadedDesign && (
                  <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f0f0f0', borderRadius: '5px', fontSize: '0.9rem' }}>
                    Currently editing: <strong>{pageContext.currentLoadedDesign.name}</strong>
                  </div>
                )}
                {errorMessage && (
                  <div style={{ color: '#C44536', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                    {errorMessage}
                  </div>
                )}
                {pageContext.currentLoadedDesign && (
                  <button 
                    className="saveDialogSaveBtn"
                    onClick={() => handleSave(true)}
                    style={{ width: '100%', marginBottom: '1rem' }}
                  >
                    Update "{pageContext.currentLoadedDesign.name}"
                  </button>
                )}
                <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                  {pageContext.currentLoadedDesign ? 'Or save as a new design:' : 'Enter a name for your design:'}
                </div>
                <input
                  type="text"
                  className="saveDialogInput"
                  placeholder="Enter design name..."
                  value={designName}
                  onChange={(e) => {
                    setDesignName(e.target.value);
                    setErrorMessage('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSave(false)}
                  autoFocus={!pageContext.currentLoadedDesign}
                />
                <div className="saveDialogActions">
                  <button 
                    className="saveDialogCancelBtn"
                    onClick={() => setShowSaveDialog(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="saveDialogSaveBtn"
                    onClick={() => handleSave(false)}
                    disabled={!designName.trim()}
                  >
                    Save as New
                  </button>
                </div>
              </div>
            </motion.div>
          )}

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
});

export default Customizer;
