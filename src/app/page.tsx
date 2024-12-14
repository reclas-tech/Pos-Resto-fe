"use client";

import { DarkModeComponents } from "@/components/ui/darkModeButton";
import SplashScreen from "@/components/ui/SplashScreen";
import Image from "next/image";

export default function MainPage() {
  return (
    <>
      <SplashScreen />

      <DarkModeComponents />
    </>
  );
}
