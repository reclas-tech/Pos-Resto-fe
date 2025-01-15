import Image from "next/image";
import logo from "@assets/splashScreen.png";
type Product = {
  id: string;
  name: string;
  quantity: number;
  note?: string;
  price:string;
};

type Data = {
  id: string;
  no_transaksi: string;
  time: string;
  customer: string;
  table: string;
  products: Product[];
  quantity: number;
  sub_total: string;
  total_tagihan: string;
  cash: string;
  total_bayar: string;
};

type PaymentReceiptProps = {
  data: Data | null; // Data bisa null jika tidak tersedia
};
const PaymentReceipt: React.FC<PaymentReceiptProps> = ({ data }) => {
  if (!data) return null;
  return (
    <div
      id="struk"
      className="bg-white p-4 text-[13.5px] w-80 min-w-[320px] max-w-[380px] shadow-md"
    >
      <div className="flex justify-center">
        <div className="w-16 h-[70px]">
          <Image
            src={logo}
            alt="logo"
            className="w-full h-full grayscale"
            unoptimized
          />
        </div>
      </div>
      <p className="text-center px-6 my-4">
        Waroeng Aceh Garuda Jl. Tebet barat no 25 RT 014/ RW 04, kel. Tebet
        Barat, Kec. Tebet, Kota Jakarta Selatan
      </p>

      <div className="text-left mt-6 grid grid-cols-2 py-2 gap-1 border-y border-dashed border-black">
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
      </div>

      <div className="text-left mt-2 grid grid-cols-2 px-3 py-4 gap-1 border-b border-dashed border-black">
        <p>Sub Total {data.quantity} Produk</p>
        <p>: {data.sub_total}</p>
        <p>Total Tagihan</p>
        <p>: {data.total_tagihan}</p>
      </div>
      <div className="text-left mt-2 grid grid-cols-2 px-3 py-4 gap-1 border-b border-dashed border-black">
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

export default PaymentReceipt;

// Example Use
//  const dataPaymentReceipt = [
//    {
//      id: "1",
//      no_transaksi: "INV1232134",
//      time: "21 Des 24 15: 21",
//      customer: "Andika Jaya",
//      table: "Meja 2",

//      products: [
//        {
//          id: "1",
//          name: "Kopi Hitam",
//          quantity: 1,
//          note: "Tanpa gula",
//          price: "33,000",
//        },
//        {
//          id: "2",
//          quantity: 1,
//          name: "Es Teh",
//          note: "",
//          price: "15,000",
//        },
//      ],
//      quantity: 4,
//      sub_total: "20,000",
//      total_tagihan: "20,000",
//      cash: "20,000",
//      total_bayar: "20,000",
//    },
//  ];

//  <PaymentReceipt data={dataPaymentReceipt[0]} />

