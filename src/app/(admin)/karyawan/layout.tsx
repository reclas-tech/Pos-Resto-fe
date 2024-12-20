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

  let linkHref = "/karyawan";
  let pageTitle = "Karyawan";

  if (pathname.includes("/karyawan/") && pathname.includes("/edit")) {
    linkHref = "/karyawan";
    pageTitle = "Edit Karyawan";
  } else if (pathname !== "/karyawan") {
    linkHref = "/karyawan";
    pageTitle = "Tambah Karyawan";
  }

  return (
    <>
      <div className="flex items-center gap-2 mb-5">
        {pathname !== "/karyawan" && (
          <Link href={linkHref}>
            <div className="flex items-center justify-center bg-primaryColor rounded-full w-7 h-7">
              <BackSVG  />
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
