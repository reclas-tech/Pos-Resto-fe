"use client";
import Image from "next/image";
import logo from "@assets/splashScreen.png";
import { Ref } from "react";
import { InvoiceDetailApiResponse } from "@/components/parts/cashier/pilih-meja/interface";

type ProductOrPacket = {
  id: string;
  name: string;
  quantity: number;
  note?: string;
  price: string;
};

type Data = {
  id: string;
  no_transaksi: string;
  time: string;
  customer: string;
  table: string;
  products: ProductOrPacket[];
  packets: ProductOrPacket[];
  quantity: number;
  sub_total: string;
  total_tagihan: string;
  cash: string;
  total_bayar: string;
  tax: string;
  tax_percent: number;
};

type PaymentReceiptProps = {
  dataReceipt: InvoiceDetailApiResponse | null | undefined;
  ref?: Ref<HTMLDivElement>;
  printStatus?: string;
  kembalian?: string;
  cashTotal?: string;
  transaksi?: "cash" | "debit" | "qris" | null;
};

const transformDataReceiptToData = (
  response: PaymentReceiptProps["dataReceipt"]
): Data | null => {
  if (!response || response.statusCode !== 200) return null;

  const {
    data: {
      id,
      created_at,
      customer,
      tables,
      products,
      packets,
      tax,
      tax_percent,
      price_sum,
    },
  } = response;

  return {
    id,
    no_transaksi: response.data.codes[0] || "N/A",
    time: new Date(created_at).toLocaleString(),
    customer,
    table: tables.length > 0 ? tables.join(", ") : "-",
    products: products.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      note: product.note || undefined,
      price: `Rp ${product.price.toLocaleString()}`,
    })),
    packets: packets.map((packet) => ({
      id: packet.id,
      name: packet.name,
      quantity: packet.quantity,
      note: packet.note || undefined,
      price: `Rp ${packet.price.toLocaleString()}`,
    })),
    quantity:
      products.reduce((sum, product) => sum + product.quantity, 0) +
      packets.reduce((sum, packet) => sum + packet.quantity, 0),
    sub_total: `Rp ${(price_sum - tax).toLocaleString()}`,
    total_tagihan: `Rp ${(price_sum || 0).toLocaleString()}`,
    tax: `Rp ${(tax || 0).toLocaleString()}`,
    tax_percent: tax_percent || 0,
    cash: `Rp ${(price_sum || 0).toLocaleString()}`,
    total_bayar: `Rp ${(price_sum || 0).toLocaleString()}`,
  };
};

const PaymentReceipt: React.FC<PaymentReceiptProps> = ({
  dataReceipt,
  ref,
  printStatus,
  transaksi,
  kembalian,
  cashTotal
}) => {
  const data = transformDataReceiptToData(dataReceipt);
  console.log("data=", data)
  if (!data) return null;

  return (
    <div
      id="struk"
      className="bg-white p-[2%] text-[10px] w-full max-w-[300px]"
      ref={ref}
    >
      <div className="flex justify-center">
        {/* <div className="w-[25%] h-[25%]">
          <Image
            src={logo}
            alt="logo"
            className="w-full h-full grayscale"
            unoptimized
          />
        </div> */}
        <div className="relative w-20 h-20">
          <Image
            src={logo}
            alt="logo"
            className="grayscale object-contain"
            fill
            sizes="80px"
            priority
          />
        </div>
      </div>
      <p className="text-center px-[10%] my-[10%]">
        Waroeng Aceh Garuda Jl. Tebet barat no 25 RT 014/ RW 04, kel. Tebet
        Barat, Kec. Tebet, Kota Jakarta Selatan
      </p>

      <div className="text-left grid grid-cols-2 py-4 gap-[1%]  border-y border-dashed border-black">
        <p>No Transaksi</p>
        <p>: {data.no_transaksi}</p>
        <p>Waktu</p>
        <p>: {data.time}</p>
        <p>Nama Pemesan</p>
        <p>: {data.customer}</p>
        <p>Nomor Meja</p>
        <p>: {data.table}</p>
      </div>

      <div className="mt-4 space-y-2 border-b border-dashed border-black pb-4">
        {data.products.map((product) => (
          <div key={product.id}>
            <div className="flex justify-between">
              <span className="flex space-x-2">
                <p>{product.quantity}x</p>
                <p>@{product.name}</p>
              </span>
              <p>{product.price}</p>
            </div>
            {product.note && product.note.trim() !== "" && (
              <ul className="list-disc ml-6">
                <li className="">{product.note}</li>
              </ul>
            )}
          </div>
        ))}
        {data.packets.map((packet) => (
          <div key={packet.id}>
            <div className="flex justify-between">
              <span className="flex space-x-2">
                <p>{packet.quantity}x</p>
                <p>@{packet.name}</p>
              </span>
              <p>{packet.price}</p>
            </div>
            {packet.note && packet.note.trim() !== "" && (
              <ul className="list-disc ml-6">
                <li className="">{packet.note}</li>
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="text-left border-b py-4 space-y-[1%] border-dashed border-black">
        <span className="flex justify-between">
          <p>Sub Total {data.quantity} Produk</p>
          <p>{data.sub_total}</p>
        </span>
        <span className="flex justify-between">
          <p>Pajak({data.tax_percent}%)</p>
          <p>{data.tax}</p>
        </span>
        <span className="flex justify-between">
          <p>Total Tagihan</p>
          <p>{data.total_tagihan}</p>
        </span>
      </div>

      <div className={`text-left ${printStatus === "detail" ? "hidden" : ""} space-y-[1%] py-4 border-b border-dashed border-black`}>
        <span className="flex justify-between">
          <p className="capitalize">{transaksi}</p>
          <p>{transaksi !== "cash" ? data.total_tagihan : cashTotal}</p>
        </span>
        <span className={`flex ${transaksi !== "cash" ? "hidden" : ""} justify-between`}>
          <p>Kembalian</p>
          <p>{kembalian}</p>
        </span>
      </div>

      <div className="border-t border-dashed border-black mt-2 py-2">
        <p className="text-center mt-4">{data.time}</p>
        <p className="text-center">Cetak : Waroeng Aceh Garuda</p>
      </div>
    </div>
  );
};

export default PaymentReceipt;
