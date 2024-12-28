"use client";
import Image from "next/image";
import img from "@assets/bgLoginKasir.png";
import logo from "@assets/splashScreen.png";

const LoginKasirPage = () => {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full">
        <div className="w-full h-full bg-primaryColor relative flex justify-center items-center overflow-hidden">
          <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full top-[-300px] right-[-300px] z-0" />
          <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-5% from-white opacity-20 rounded-full bottom-[-250px] left-[-350px] z-0" />
          <div className="space-y-14 z-10">
            <div className="space-y-6 text-center text-white">
              <p className="text-4xl font-bold leading-10">Login Kasir</p>
              <p className="text-2xl leading-8">Waroeng Aceh Garuda</p>
            </div>
            <div className=" bg-white rounded-lg w-[320px] h-[400px] p-10 space-y-4 ">
              <p className="text-center text-[#334155] text-xl font-semibold ">Kode Pin</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 h-full">
        <div className="w-full h-full flex justify-center items-center relative bg-gray-700">
          <Image
            unoptimized
            src={img}
            alt="bg"
            className="w-full h-full object-cover absolute mix-blend-overlay"
          />
          <Image
            unoptimized
            src={logo}
            alt="logo"
            className="w-[300px] absolute"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginKasirPage;
