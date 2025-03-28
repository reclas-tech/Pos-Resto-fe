import Image from "next/image";
import logo from "@assets/splashScreen.png";
import { Ref } from "react";
import { GetOneInvoiceApiResponse } from "@/components/parts/cashier/history/interface";

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
};

type HistoryReceiptProps = {
  dataReceipt: GetOneInvoiceApiResponse | null;
  ref?: Ref<HTMLDivElement> | undefined;
};

const transformDataReceiptToData = (
  response: HistoryReceiptProps["dataReceipt"]
): Data | null => {
  if (!response || response.statusCode !== 200 || !response.data) return null;

  const {
    data: {
      id,
      created_at,
      customer = "-", // Provide default value
      tables = [], // Ensure it's an array
      products = [],
      packets = [],
      tax = 0,
      price_sum = 0,
      code,
    },
  } = response;

  return {
    id,
    no_transaksi: code || "N/A", // Optional chaining
    time: new Date(created_at).toLocaleString(),
    customer,
    table: tables.length > 0 ? tables.join(", ") : "-",
    products: products.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: product.quantity || 0,
      note: product.note || undefined,
      price: `Rp ${(product.price_sum || 0).toLocaleString()}`,
    })),
    packets: packets.map((packet) => ({
      id: packet.id,
      name: packet.name,
      quantity: packet.quantity || 0,
      note: packet.note || undefined,
      price: `Rp ${(packet.price_sum || 0).toLocaleString()}`,
    })),
    quantity:
      products.reduce((sum, product) => sum + (product.quantity || 0), 0) +
      packets.reduce((sum, packet) => sum + (packet.quantity || 0), 0),
    sub_total: `Rp ${Math.max(price_sum - tax, 0).toLocaleString()}`,
    total_tagihan: `Rp ${(price_sum || 0).toLocaleString()}`,
    cash: `Rp ${(price_sum || 0).toLocaleString()}`,
    total_bayar: `Rp ${(price_sum || 0).toLocaleString()}`,
  };
};

const HistoryReceipt: React.FC<HistoryReceiptProps> = ({
  dataReceipt,
  ref,
}) => {
  const data = transformDataReceiptToData(dataReceipt);
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

      <div className="text-left grid grid-cols-2 py-2 gap-[1%]  border-y border-dashed border-black">
        <p>No Transaksi</p>
        <p>: {data.no_transaksi}</p>
        <p>Waktu</p>
        <p>: {data.time}</p>
        <p>Nama Pemesan</p>
        <p>: {data.customer}</p>
        <p>Nomor Meja</p>
        <p>: {data.table}</p>
      </div>

      <div className="mt-2 space-y-2 border-b border-dashed border-black pb-2">
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

      <div className="text-left mt-2 grid grid-cols-2 px-3 py-4 gap-[1%] border-b border-dashed border-black">
        <p>Sub Total {data.quantity} Produk</p>
        <p>: {data.sub_total}</p>
        <p>Total Tagihan</p>
        <p>: {data.total_tagihan}</p>
      </div>
      <div className="text-left mt-2 grid grid-cols-2 px-3 py-4 gap-[1%] border-b border-dashed border-black">
        <p>Tunai</p>
        <p>: {data.cash}</p>
        <p>Total Bayar</p>
        <p>: {data.total_bayar}</p>
      </div>

      <div className="border-t border-dashed border-black mt-2 py-2">
        <p className="text-center mt-4">{data.time}</p>
        <p className="text-center">Cetak : Waroeng Aceh Garuda</p>
      </div>
    </div>
  );
};


export default HistoryReceipt;
