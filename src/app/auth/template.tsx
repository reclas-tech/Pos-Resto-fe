'use client'
import React from "react";
import logo from "@assets/splashScreen.png";
import vector from "@assets/vektorAuth.png";
import Image from "next/image";

function LoginPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full h-screen bg-grayColor flex items-center justify-end px-10">
        <div className="space-y-14">
          <div className="flex items-center space-x-4">
            <Image src={logo} alt="logo" className="w-28 h-32" unoptimized />
            <div>
              <h2 className="text-4xl font-medium">Pos System</h2>
              <h4 className="text-center">Waroeng Garuda Aceh</h4>
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-lg py-6 px-4">
            {children}
          </div>
        </div>
        <div className="w-[55%] h-auto">
          <Image
            src={vector}
            alt="vector"
            className="object-contain w-full h-full"
            unoptimized
          />
        </div>
      </div>
    </>
  );
}

export default LoginPage;
