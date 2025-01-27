// to name const always use camelcase

import {
  BerandaIcon,
  CloseCashierIcon,
  DapurIcon,
  KaryawanIcon,
  KategoriIcon,
  KeluarIcon,
  LaporanIcon,
  MejaIcon,
  ProdukIcon,
  TransaksiIcon,
} from "./svgIcons";

export const adminSidebarIcons = [
  {
    label: "Beranda",
    href: "/beranda",
    icon: (
      <>
        <BerandaIcon size={20} color="currentColor" />
      </>
    ),
  },
  {
    label: "Produk",
    href: "/produk",
    icon: (
      <>
        <ProdukIcon size={20} color="currentColor" />
      </>
    ),
  },
  {
    label: "Kategori",
    href: "/kategori",
    icon: (
      <>
        <KategoriIcon size={20} color="currentColor" />
      </>
    ),
  },
  {
    label: "Dapur",
    href: "/dapur",
    icon: (
      <>
        <DapurIcon size={20} color="currentColor" />
      </>
    ),
  },
  {
    label: "Laporan",
    href: "/laporan",
    icon: (
      <>
        <LaporanIcon size={20} color="currentColor" />
      </>
    ),
  },
  {
    label: "Meja",
    href: "/meja",
    icon: (
      <>
        <MejaIcon size={20} color="currentColor" />
      </>
    ),
  },
  {
    label: "Karyawan",
    href: "/karyawan",
    icon: (
      <>
        <KaryawanIcon size={20} color="currentColor" />
      </>
    ),
  },
  {
    label: "Transaksi",
    href: "/transaksi",
    icon: (
      <>
        <TransaksiIcon size={20} color="currentColor" />
      </>
    ),
  },
  {
    label: "Penutupan Kasir",
    href: "/tutup-kasir",
    icon: (
      <>
        <CloseCashierIcon size={20} color="currentColor" />
      </>
    ),
  },
  {
    label: "Keluar",
    href: "/",
    icon: (
      <>
        <KeluarIcon size={20} color="currentColor" />
      </>
    ),
  },
];
