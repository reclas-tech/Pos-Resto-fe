"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SplashScreen = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStage(1);
    }, 1000);

    const timer2 = setTimeout(() => {
      setStage(2);

      // setTimeout(() => {
      //   window.location.href = "/product";
      // }, 5000);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const leftSideVariants = {
    initial: { width: "100%" },
    animate: { width: "100%" },
    exit: { width: "0%" },
  };

  const rightSideVariants = {
    initial: {
      width: "0%",
      opacity: 0,
      x: "50%",
    },
    animate: {
      width: "100%",
      opacity: 1,
      x: 0,
    },
    exit: {
      width: "100%",
      opacity: 1,
      x: "100%",
    },
  };

  return (
    <div className="flex h-screen overflow-hidden bg-primaryColor dark:bg-secondaryColor">
      <AnimatePresence>
        {stage < 2 && (
          <motion.div
            key="leftSide"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={leftSideVariants}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative h-screen text-primaryTextColor dark:text-white flex justify-center items-center overflow-hidden"
          >
            <div className="absolute w-[700px] h-[700px] bg-gradient-to-bl from-white opacity-20 rounded-full bottom-[-380px] left-[-380px]" />
            <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full top-[-380px] right-[-380px]" />
            <div className="text-center text-white dark:text-white z-10">
              <div className="pb-6 text-5xl font-bold">Selamat Datang</div>
              <div className="pt-6 text-4xl">
                Sistem Point Of Sale <br />
                Waroeng Aceh Garuda
              </div>
            </div>
          </motion.div>
        )}

        {stage >= 1 && (
          <motion.div
            key="rightSide"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={rightSideVariants}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative h-screen bg-splashScreenBg bg-cover bg-center dark:bg-secondaryColor text-primaryTextColor dark:text-white flex justify-center items-center overflow-hidden"
          >
            <div className="absolute w-[700px] h-[700px] bg-gradient-to-bl from-white opacity-20 rounded-full bottom-[-380px] left-[-380px]" />
            <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full top-[-380px] right-[-380px]" />
            <div className="text-center text-white dark:text-white z-10">
              <Image
                width={300}
                height={300}
                src="/assets/images/splashScreen.png"
                alt="Waroeng Aceh Garuda"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;
