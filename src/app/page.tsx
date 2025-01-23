"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import SplashScreen from "@/components/ui/SplashScreen";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false);
      setIsExiting(true); 
      setTimeout(() => {
        router.push("/login-waiters"); 
      }, 1000); 
    }, 4500);
    return () => clearTimeout(splashTimeout);
  }, [router]);

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
            {!isExiting && (
              <>
                <div className="">Halaman Utama</div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <DarkModeComponents />
    </>
  );
}
