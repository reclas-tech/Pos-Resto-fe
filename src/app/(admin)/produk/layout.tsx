"use client";

import { BackSVG } from "@/constants/svgIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const pathname = usePathname();

  const getRouteConfig = () => {
    if (pathname.includes("/edit-paket")) {
      return {
        href: "/produk/menu-paket",
        title: "Edit Paket",
      };
    }
    if (pathname.includes("/tambah-paket")) {
      return {
        href: "/produk/menu-paket",
        title: "Tambah Paket",
      };
    }
    if (pathname.includes("/menu-paket")) {
      return {
        href: "/produk",
        title: "Menu Paket",
      };
    }
    if (pathname.includes("/edit")) {
      return {
        href: "/produk",
        title: "Edit Produk",
      };
    }
    if (pathname.includes("/tambah")) {
      return {
        href: "/produk",
        title: "Tambah Produk",
      };
    }
    return {
      href: "/produk",
      title: "Produk",
    };
  };

  const { href: linkHref, title: pageTitle } = getRouteConfig();

  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        {pathname !== "/produk" && (
          <Link href={linkHref}>
            <div className="flex items-center justify-center bg-primaryColor rounded-full w-7 h-7">
              <BackSVG />
            </div>
          </Link>
        )}
        <div className="text-secondaryColor dark:text-primaryColor font-bold text-3xl">
          {pageTitle}
        </div>
      </div>
      {children}
    </>
  );
}
