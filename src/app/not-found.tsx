"use client"

import React from 'react';
import Image from 'next/image';
import { DarkModeComponents } from '@/components/ui/darkModeButton';
import { motion } from 'framer-motion';

function NotFound() {
    return (
        <>
            <motion.div
                className="relative w-full h-screen bg-primaryColor bg-cover bg-center dark:bg-secondaryColor text-primaryTextColor dark:text-white flex justify-center items-center overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="absolute w-[700px] h-[700px] bg-gradient-to-bl from-white opacity-20 rounded-full bottom-[-380px] left-[-380px]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute w-[700px] h-[700px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full top-[-380px] right-[-380px]"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <div className="text-center text-white dark:text-white z-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                    >
                        <Image
                            width={300}
                            height={300}
                            src={"/assets/images/notFound.png"}
                            alt="Waroeng Aceh Garuda"
                        />
                    </motion.div>
                </div>
            </motion.div>
            <DarkModeComponents />
        </>
    )
}

export default NotFound;
