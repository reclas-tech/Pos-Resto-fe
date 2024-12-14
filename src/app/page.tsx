"use client";

import { DarkModeComponents } from "@/components/ui/darkModeButton";
import Image from "next/image";

export default function MainPage() {
  return (
    <>
      <div className="flex">
        <div className="relative w-1/2 h-screen bg-primaryColor dark:bg-secondaryColor text-primaryTextColor dark:text-white flex justify-center items-center overflow-hidden">
          <div className="absolute w-[700px] h-[700px] bg-gradient-to-bl from-white opacity-20 rounded-full bottom-[-380px] left-[-380px]" />
          <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full top-[-380px] right-[-380px]" />
          <div className="text-center text-white dark:text-white z-10">
            <div className="pb-6 text-5xl font bold">Selamat Datang</div>
            <div className="pt-6 text-4xl">
              Sistem Point Of Sale <br /> Waroeng Aceh Garuda
            </div>
          </div>
        </div>

        <div className="relative w-1/2 h-screen bg-splashScreenBg bg-cover bg-center dark:bg-secondaryColor text-primaryTextColor dark:text-white flex justify-center items-center overflow-hidden">
          <div className="absolute w-[700px] h-[700px] bg-gradient-to-bl from-white opacity-20 rounded-full bottom-[-380px] left-[-380px]" />
          <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full top-[-380px] right-[-380px]" />
          <div className="text-center text-white dark:text-white z-10">
            <Image
              width={300}
              height={300}
              src={"/assets/images/splashScreen.png"}
              alt="Waroeng Aceh Garuda"
            ></Image>
          </div>
        </div>
      </div>

      <DarkModeComponents />
    </>
  );
}
