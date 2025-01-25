import React, { Ref } from "react";

type ReceiptData = {
  date: string;
  cashier_name: string;
  start_at: string;
  end_at: string | null;
  cash_on_hand_start: number;
  income: number;
  cash_on_hand_end: number | null;
  transaction_count: number;
  success_inv: number;
  failed_inv: number;
  out_inv: number;
  cash: number;
  debit: number;
  qris: number;
  total: number;
};

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
    <div ref={ref} id="struk" className="bg-white p-[2%] text-[10px] w-full">
      <p className="text-center uppercase">Tutup Kasir</p>
      <div className="text-left mt-6 grid grid-cols-2 py-2 gap-1">
        <p>Tanggal</p>
        <p>: {receiptData.date}</p>
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
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.cash_on_hand_start)}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>End Kasir</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.cash_on_hand_end)}</p>
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
            <p>{receiptData.transaction_count}</p>
          </span>
        </div>
        <p className="pt-4">Pembayaran Tunai</p>
      </div>

      <div className="border-y mt-1 space-y-1 border-dashed border-black py-2">
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
            <p>Nota Berhasil</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.success_inv)}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Nota Gagal</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.failed_inv)}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Nota Keluar</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{safeToLocaleString(receiptData.out_inv)}</p>
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

      <div className="border-t border-dashed gap-1 border-black py-2">
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
