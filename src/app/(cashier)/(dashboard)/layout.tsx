"use client";

import React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { adminSidebarIcons } from "@/constants/main";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { showAlert2 } from "@/lib/sweetalert2";
import AuthGuard from "@/hooks/authGuard";
import logo from "@assets/splashScreen.png";
import {
  CloseSVG,
  DropDownSVG,
  KeluarIcon,
  MejaSVG,
  RiwayatSVG,
} from "@/constants/svgIcons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function RootLayoutDashboardCashier({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    setTimeout(() => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      router.push("/login");
      showAlert2("success", "Berhasil Logout.");
    }, 10);
  };

  return (
    <>
      {/* <AuthGuard> */}
      <nav
        className={cn(
          "flex justify-between w-full pt-2 pb-2 pl-4 pr-4 text-xs border border-b",
          "h-full"
        )}
      >
        <div className="flex gap-4">
          <Image
            unoptimized
            src={logo}
            alt="logo"
            className="w-[35px] h-[42px]"
          />
          <div className="flex flex-col justify-center font-bold">
            <div className="text-black">Point Of Sale</div>
            <div className="text-[#828487]">Waroeng Aceh Garuda</div>
          </div>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <div className="flex gap-2 items-center text-primaryColor">
            <MejaSVG />
            <span>Meja</span>
          </div>
          <div className="flex gap-2">
            <RiwayatSVG />
            <div className="flex flex-col justify-center text-[#737791]">
              Riwayat
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-between">
          <div className="flex flex-col justify-center">
            10:53:00 26/02/2023
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col justify-center">
              <div className="text-black font-bold">Amalia Putri</div>
              <div className="text-black/50 text-[10px]">Kasir</div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex flex-col justify-center">
                  <DropDownSVG />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-white border border-gray-300 shadow-2xl rounded-md w-[150px]">
                <div className="p-2 text-xs space-y-1">
                  <div className="w-full space-y-2">
                    <Button
                      variant={"outline"}
                      onClick={() => router.push("/login-kasir")}
                      className="rounded-xl w-full justify-start text-xs border-none"
                    >
                      <span>
                        <KeluarIcon className="text-primaryColor" />
                      </span>
                      <span>Tutup Kasir</span>
                    </Button>
                    <Button
                      variant={"outline"}
                      onClick={() => router.push("/login-kasir")}
                      className="rounded-xl w-full justify-start text-xs border border-[#FF0000]"
                    >
                      <span>
                        <CloseSVG />
                      </span>
                      <span>Keluar</span>
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <>{children}</>
      <DarkModeComponents className="hidden" />
      {/* </AuthGuard> */}
    </>
  );
}
