"use client"

/* eslint-disable react/display-name */
import React from "react";
import { useGetCloseCashierOne } from "./api";
import { format, parseISO } from "date-fns";

type PropsInvoice = {
    idInvoice: string;
};

const TableReceiptAdmin = React.forwardRef<HTMLDivElement, PropsInvoice>((props, ref) => {
    const {
        idInvoice
    } = props;

    // Data fetching
    const { data: dataDetail } = useGetCloseCashierOne(idInvoice);

    // if (!dataDetail?.data) return null;

    return (
        <div ref={ref} id="struk" className="bg-white p-[2%] text-[10px] max-w-[300px]">
            <p className="text-center uppercase">Tutup Kasir</p>
            <div className="text-left mt-6 grid grid-cols-2 py-2 gap-1">
                <p>Tanggal</p>
                <p>:  {dataDetail?.data[0]?.date
                    ? format(parseISO(dataDetail?.data[0]?.date), "dd/MM/yyyy")
                    : "-"}</p>
                <p>Cashier</p>
                <p>: {dataDetail?.data[0]?.cashier_name || "-"}</p>
                <p className="mt-3">Shift Print</p>
            </div>

            <div className="border-y border-dashed space-y-1 border-black py-2">
                <div className="flex w-full">
                    <span className="w-[40%] flex justify-between">
                        <p>Start Kasir</p>
                        <p>:</p>
                    </span>
                    <span className="w-[60%] flex justify-end">
                        <p>{dataDetail?.data[0]?.start_at
                            ? format(parseISO(dataDetail?.data[0]?.start_at), "dd/MM/yyyy, HH:mm:ss")
                            : "-"}</p>
                    </span>
                </div>
                <div className="flex w-full">
                    <span className="w-[40%] flex justify-between">
                        <p>End Kasir</p>
                        <p>:</p>
                    </span>
                    <span className="w-[60%] flex justify-end">
                        <p>
                            {dataDetail?.data[0]?.end_at
                                ? format(parseISO(dataDetail?.data[0]?.end_at), "dd/MM/yyyy, HH:mm:ss")
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
                        <p>
                            {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.cash_on_hand_start || 0)}
                        </p>
                    </span>
                </div>
                <div className="flex w-full">
                    <span className="w-[40%] flex justify-between">
                        <p>Pemasukan</p>
                        <p>:</p>
                    </span>
                    <span className="w-[60%] flex justify-between">
                        <p className="ml-[3%]">Rp</p>
                        <p>
                            {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.income || 0)}
                        </p>
                    </span>
                </div>
                <div className="flex w-full">
                    <span className="w-[40%] flex justify-between">
                        <p>Saldo Akhir</p>
                        <p>:</p>
                    </span>
                    <span className="w-[60%] flex justify-between">
                        <p className="ml-[3%]">Rp</p>
                        <p>
                            {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.cash_on_hand_end || 0)}
                        </p>
                    </span>
                </div>
                <div className="flex w-full">
                    <span className="w-[40%] flex justify-between">
                        <p>Jumlah Transaksi</p>
                        <p>:</p>
                    </span>
                    <span className="w-[60%] text-end">
                        <p>{dataDetail?.data[0]?.transaction_count || "-"}</p>
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
                        <p>
                            {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.cash_on_hand_start || 0)}
                        </p>
                    </span>
                </div>
                <div className="flex w-full">
                    <span className="w-[40%] flex justify-between">
                        <p>Nota Tunai</p>
                        <p>:</p>
                    </span>
                    <span className="w-[60%] flex justify-between border-b pb-1 border-dashed border-black">
                        <p className="ml-[3%]">Rp</p>
                        <p>{new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.cash || 0)}</p>
                    </span>
                </div>
                <div className="flex w-full">
                    <span className="w-[40%] flex justify-between">
                        <p>Setoran Kasir</p>
                        <p>:</p>
                    </span>
                    <span className="w-[60%] flex justify-between">
                        <p className="ml-[3%]">Rp</p>
                        <p>{new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.cashier_deposit || 0)}</p>
                    </span>
                </div>
                <div className="flex w-full">
                    <span className="w-[40%] flex justify-between">
                        <p>Setoran Tutup Kasir</p>
                        <p>:</p>
                    </span>
                    <span className="w-[60%] flex justify-between border-b pb-1 border-dashed border-black">
                        <p className="ml-[3%]">Rp</p>
                        <p>{new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.cash_on_hand_end || 0)}</p>
                    </span>
                </div>
                <div className="flex w-full">
                    <span className="w-[40%] flex justify-between">
                        <p>Selisih</p>
                        <p>:</p>
                    </span>
                    <span className="w-[60%] flex justify-between">
                        <p className="ml-[3%]">Rp</p>
                        <p>
                            {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.difference || 0)}
                        </p>
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
                        <p>
                            {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.cash || 0)}
                        </p>
                    </span>
                </div>
                <div className="flex w-full">
                    <span className="w-[40%] flex justify-between">
                        <p>Debit</p>
                        <p>:</p>
                    </span>
                    <span className="w-[60%] flex justify-between">
                        <p className="ml-[3%]">Rp</p>
                        <p>
                            {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.debit || 0)}
                        </p>
                    </span>
                </div>
                <div className="flex w-full">
                    <span className="w-[40%] flex justify-between">
                        <p>Qris</p>
                        <p>:</p>
                    </span>
                    <span className="w-[60%] flex justify-between">
                        <p className="ml-[3%]">Rp</p>
                        <p>
                            {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.qris || 0)}
                        </p>
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
                        <p>
                            {new Intl.NumberFormat('id-ID').format(dataDetail?.data[0]?.total || 0)}
                        </p>
                    </span>
                </div>
            </div>
        </div>
    );
});

export default TableReceiptAdmin;
