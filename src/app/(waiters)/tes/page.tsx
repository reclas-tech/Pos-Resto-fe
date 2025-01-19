"use client";
import KitchenReceipt from "@/components/ui/struk/KitchenReceipt";
import TableReceipt from "@/components/ui/struk/TableReceipt";
import PaymentReceipt from "@/components/ui/struk/PaymentReceipt";
import CloseCashierReceipt from "@/components/ui/struk/CloseCahierReceipt";
import TableTest from "@/components/ui/struk/Test";
export default function TesPage() {
  const dataKitchenReceipt = [
    {
      id: "1",
      kitchen: "Dapur 1",
      no_transaksi: "INV1232134",
      time: "21 Des 24 15: 21",
      customer: "Andika Jaya",
      table: "Meja 2",

      products: [
        {
          id: "1",
          name: "Kopi Hitam",
          quantity: 1,
          note: "Tanpa gula",
        },
        {
          id: "2",
          name: "Teh Manis",
          quantity: 1,
          note: "Gulanya Sedikit",
        },
      ],
    },
  ];

  const dataTableReceipt = [
    {
      id: "1",
      no_transaksi: "INV1232134",
      time: "21 Des 24 15: 21",
      customer: "Andika Jaya",
      table: "Meja 2",

      products: [
        {
          id: "1",
          name: "Kopi Hitam",
          quantity: 1,
          note: "Tanpa gula",
        },
        {
          id: "2",
          quantity: 1,
          name: "Es Teh",
        },
      ],
    },
  ];

  const dataPaymentReceipt = [
    {
      id: "1",
      no_transaksi: "INV1232134",
      time: "21 Des 24 15: 21",
      customer: "Andika Jaya",
      table: "Meja 2",

      products: [
        {
          id: "1",
          name: "Kopi Hitam",
          quantity: 1,
          note: "Tanpa gula",
          price: "33,000",
        },
        {
          id: "2",
          quantity: 1,
          name: "Es Teh",
          note: "",
          price: "15,000",
        },
      ],
      quantity: 4,
      sub_total: "20,000",
      total_tagihan: "20,000",
      cash: "20,000",
      total_bayar: "20,000",
    },
  ];

  const dataCloseCashierReceipt = [
    {
      id: "1",
      tanggal: "19/10/2024",
      name_cashier: "Putri Amelia",
      start_cashier: "19/10/2024 00:08:42",
      end_cashier: "19/10/2024 22:04:28",
      saldo_awal: "2,000,000",
      pemasukan: "984.000",
      saldo_akhir: "2,984,000",
      jumlah_transaksi: 41,
      saldo_akhir_tunai: "2,000,000",
      nota_succes: "984.000",
      nota_fail: "0",
      nota_exit: "2,984,000",
      cash: "2,000,000",
      debit: "984.000",
      qris: "0",
      total: "2,984,000",
    },
  ];

  const dataTest = [
    {
      id: "1",
      no_transaksi: "INV1232134",
      time: "21 Des 24 15: 21",
      customer: "Andika Jaya",
      table: "Meja 2",

      products: [
        {
          id: "1",
          name: "Kopi Hitam",
          quantity: 1,
          note: "Tanpa gula",
        },
        {
          id: "2",
          quantity: 1,
          name: "Es Teh",
        },
      ],
    },
  ];
  return (
    <>
      {/* <div className="w-full min-h-screen p-2 bg-red-200 space-x-2 flex justify-center"> */}
        {/* <KitchenReceipt data={dataKitchenReceipt[0]} /> */}
        <TableReceipt data={dataTableReceipt[0]} />
        {/* <PaymentReceipt data={dataPaymentReceipt[0]} /> */}
        {/* <CloseCashierReceipt data={dataCloseCashierReceipt[0]} /> */}
        <TableTest data={dataTest[0]} />
      {/* </div> */}
    </>
  );
}
