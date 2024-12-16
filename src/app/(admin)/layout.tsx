"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { adminSidebarIcons } from "@/constants/main";

export default function RootLayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-col md:flex-row dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
          "h-screen"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-2">
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/splashScreen.png"
                alt="Profile"
                height={75}
                width={75}
                priority
                className="w-[80px] h-[90]"
              />
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-2 flex flex-col gap-2">
                {adminSidebarIcons.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div className="bg-[#FFFAF1] p-2 flex items-center gap-2 rounded-lg">
              <Image
                src="/assets/images/foto-dashboard.png"
                alt="Profile"
                height={30}
                width={30}
                className="w-8 h-8"
              />
              <div className="flex flex-col justify-center">
                <div className="text-sm font-bold">Nata</div>
                <div className="text-xs">Admin</div>
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        <>
          <div className="flex flex-1">
            <div className="p-2 md:p-6 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full m-6 rounded-xl">
              {children}
            </div>
          </div>
        </>
      </div>
      <DarkModeComponents />
    </>
  );
}
