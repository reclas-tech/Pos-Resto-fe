"use client";
import { format, parseISO } from "date-fns";
import { Ref } from "react";

type ReceiptData = {
  date: string;
  cashier_name: string;
  start_at: string;
  end_at: string ;
  cash_on_hand_start: number;
  cash_on_hand_end: number ;
  cashier_deposit: number;
  income: number;
  difference: number;
  transaction_count: number;
  cash: number;
  debit: number;
  qris: number;
  total: number;
};

//

type CloseCashierReceiptProps = {
  data?: {
    statusCode?: number;
    message?: string;
    data?: ReceiptData[];
  };
  ref?: Ref<HTMLDivElement> | undefined;
};

const CloseCashierReceipt: React.FC<CloseCashierReceiptProps> = ({
  data,
  ref,
}) => {
  const safeToLocaleString = (value: number | null | undefined) => {
    return value !== null && value !== undefined ? value.toLocaleString() : "-";
  };

  const receiptData = data?.data?.[0];

  if (!receiptData) return null;

  return (
    <div
      ref={ref}
      id="struk"
      className="bg-white p-[2%] text-[10px] max-w-[300px]"
    >
      <p className="text-center uppercase">Tutup Kasir</p>
      <div className="text-left mt-6 grid grid-cols-2 py-2 gap-1">
        <p>Tanggal</p>
        <p>
          :
          {receiptData.date
            ? format(parseISO(receiptData.date), "dd/MM/yyyy")
            : "-"}
        </p>
        <p>Cashier</p>
        <p>: {receiptData.cashier_name}</p>
        <p className="mt-3">Shift Print</p>
      </div>

      <div className="border-y border-dashed space-y-1 border-black py-2">
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Start Kasir</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-end">
            <p>
              {receiptData.start_at
                ? format(parseISO(receiptData.start_at), "dd/MM/yyyy, HH:mm:ss")
                : "-"}
            </p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>End Kasir</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-end">
            <p>
              {receiptData.end_at
                ? format(parseISO(receiptData.end_at), "dd/MM/yyyy, HH:mm:ss")
                : "-"}
            </p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Saldo Awal</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.cash_on_hand_start)}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Pemasukan</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.income)}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Saldo Akhir</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.cash_on_hand_end)}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Jumlah Transaksi</p>
            <p>:</p>
          </span>
          <span className="w-[60%] text-end">
            <p>{safeToLocaleString(receiptData.transaction_count)}</p>
          </span>
        </div>
        <p className="pt-4">Pembayaran Tunai</p>
      </div>

      <div className="border-y mt-1 space-y-1 border-dashed border-black py-2">
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Saldo Awal</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.cash_on_hand_start)}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Nota Tunai</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between border-b pb-1 border-dashed border-black">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.cash)}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Setoran Kasir</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.cashier_deposit)}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Setoran Tutup Kasir</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between border-b pb-1 border-dashed border-black">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.cash_on_hand_end)}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Selisih</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.difference)}</p>
          </span>
        </div>
        <p className="pt-4">Rincian Pemasukan</p>
      </div>

      <div className="border-y mt-1 space-y-1 border-dashed gap-1 border-black py-2">
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Tunai</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.cash)}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Debit</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.debit)}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Qris</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.qris)}</p>
          </span>
        </div>
      </div>

      <div className=" py-2">
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Total</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.total)}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CloseCashierReceipt;
