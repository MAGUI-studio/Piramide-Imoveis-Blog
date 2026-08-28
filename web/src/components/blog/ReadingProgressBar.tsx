"use client";

import { motion, useScroll } from "framer-motion";

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
