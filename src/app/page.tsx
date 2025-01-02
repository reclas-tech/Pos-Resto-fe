"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import SplashScreen from "@/components/ui/SplashScreen";

export default function MainPage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 4500);

    return () => clearTimeout(splashTimeout);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 2 }}
          >
            <SplashScreen />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <>
              <div className="">Halaman Utama</div>
            </>
          </motion.div>
        )}
      </AnimatePresence>
      <DarkModeComponents />
    </>
  );
}
