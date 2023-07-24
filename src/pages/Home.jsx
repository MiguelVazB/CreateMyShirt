import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageContext } from "../context/PageContext";

const Home = () => {
  const { hello, setHello } = React.useContext(PageContext);
  return <div>{hello}</div>;
};

export default Home;
