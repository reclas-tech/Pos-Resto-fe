type Data = {
  id: string;
  tanggal: string;
  name_cashier: string;
  start_cashier: string;
  end_cashier: string;
  saldo_awal: string;
  pemasukan: string;
  saldo_akhir: string;
  jumlah_transaksi: number;
  saldo_akhir_tunai:string;
  nota_succes: string;
  nota_fail: string;
  nota_exit: string;
  cash: string;
  debit: string;
  qris: string;
  total: string;
};

type CloseCashierReceiptProps = {
  data: Data | null; // Data bisa null jika tidak tersedia
};
const CloseCashierReceipt: React.FC<CloseCashierReceiptProps> = ({ data }) => {
  if (!data) return null;
  return (
    <div
      id="struk"
      className="bg-white p-[2%] text-[10px] w-full  shadow-md"
    >
      <p className="text-center uppercase"> Tutup Kasir</p>
      <div className="text-left mt-6 grid grid-cols-2 py-2 gap-1 ">
        <p>Tanggal</p>
        <p>: {data.tanggal}</p>
        <p>Cashier</p>
        <p>: {data.name_cashier}</p>
        <p className="mt-3">Shift Print</p>
      </div>

      <div className=" border-y border-dashed space-y-1 border-black py-2">
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Start Kasir</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.start_cashier}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>End Kasir</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.end_cashier}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Saldo Awal</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.saldo_awal}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Pemasukan</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.pemasukan}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Saldo Akhir</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.saldo_akhir}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Jumlah Transaksi</p>
            <p>:</p>
          </span>
          <span className="w-[60%] text-end">
            <p>{data.jumlah_transaksi}</p>
          </span>
        </div>
        <p className="pt-4">Pembayaran Tunai</p>
      </div>

      <div className=" border-y mt-1 space-y-1 border-dashed  border-black py-2">
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Saldo Akhir</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.saldo_akhir_tunai}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Nota Berhasil</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.nota_succes}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Nota Gagal</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.nota_fail}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Nota Keluar</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.nota_exit}</p>
          </span>
        </div>
        <p className="pt-4">Rincian Pemasukan</p>
      </div>

      <div className=" border-y mt-1 space-y-1 border-dashed gap-1 border-black py-2">
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Tunai</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.cash}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Debit</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.debit}</p>
          </span>
        </div>
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Qris</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.qris}</p>
          </span>
        </div>
      </div>

      <div className=" border-t border-dashed gap-1 border-black py-2">
        <div className="flex w-full">
          <span className="w-[40%] flex justify-between">
            <p>Total</p>
            <p>:</p>
          </span>
          <span className="w-[60%] flex justify-between">
            <p className="ml-[3%]">Rp</p>
            <p>{data.total}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CloseCashierReceipt;
