"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import Image from "next/image";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  // IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";

export default function RootLayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    {
      label: "Beranda",
      href: "/beranda",
      icon: (
        <>
          <Image
            width={300}
            height={300}
            src="/assets/icons/beranda_icon.svg"
            alt="Waroeng Aceh Garuda"
            className="h-5 w-5 flex-shrink-0"
          />
        </>
      ),
    },
    {
      label: "Produk",
      href: "/produk",
      icon: <IconUserBolt className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Kategori",
      href: "/kategori",
      icon: <IconSettings className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Dapur",
      href: "/dapur",
      icon: <IconSettings className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Laporan",
      href: "/laporan",
      icon: <IconSettings className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Meja",
      href: "/meja",
      icon: <IconSettings className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Karyawan",
      href: "/karyawan",
      icon: <IconSettings className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Transaksi",
      href: "/tramsaksi",
      icon: <IconSettings className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Keluar",
      href: "/",
      icon: <IconArrowLeft className="h-5 w-5 flex-shrink-0" />,
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-col md:flex-row bg-white dark:bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
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
              />
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-2 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div className="bg-[#FFFAF1] p-4 flex items-center gap-2">
              <Image
                src="/assets/images/foto-dashboard.png"
                alt="Profile"
                height={30}
                width={30}
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
            <div className="p-2 md:p-10 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
              {children}
            </div>
          </div>
        </>
      </div>
      <DarkModeComponents />
    </>
  );
}
