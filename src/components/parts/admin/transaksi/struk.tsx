/* eslint-disable react/display-name */
import React from "react";
import { useGetTransaksiOne } from "./api";

type PropsInvoice = {
    idInvoice: string;
};

const TableReceiptAdmin = React.forwardRef<HTMLDivElement, PropsInvoice>((props, ref) => {
    const {
        idInvoice
    } = props;

    // Data fetching
    const { data: dataDetail } = useGetTransaksiOne(idInvoice);

    if (!dataDetail?.data) return null;

    return (
        <div ref={ref} id="struk" className="bg-white p-[2%] text-[10px] max-w-[300px]">
            <p className="uppercase text-center font-medium">Checker</p>

            <div className="text-left mt-6 grid grid-cols-2 pb-2 border-b border-dashed border-black">
                <p>No Transaksi</p>
                <p>: {dataDetail?.data?.code || "-"}</p>
                <p>Waktu</p>
                <p>: {new Date(dataDetail?.data?.created_at).toLocaleString() || "-"}</p>
                <p>Nama Kasir</p>
                <p>: {dataDetail?.data?.cashier || "-"}</p>
                <p>Transaksi</p>
                <p className="capitalize">: {dataDetail?.data?.type || "-"}</p>
                <p>Nomor Meja</p>
                <p>: {dataDetail?.data?.tables.join(", ") || "-"}</p>
            </div>

            <div className="mt-2 space-y-2 border-b border-dashed border-black pb-2">
                {dataDetail?.data?.products.map((product, index) => (
                    <div key={index}>
                        <span className="flex space-x-[2%]">
                            <p>{product.quantity || "-"}x</p>
                            <p>{product.name || "-"}</p>
                        </span>
                        {/* {product.note && product.note.trim() !== "" && (
              <ul className="list-disc ml-6">
                <li className="">{product.note}</li>
              </ul>
            )} */}
                    </div>
                ))}

                {dataDetail?.data?.packets.map((packet, index) => (
                    <div key={index}>
                        <span className="flex space-x-[2%]">
                            <p>{packet.quantity || "-"}x</p>
                            <p>{packet.name || "-"}</p>
                        </span>
                        {/* {packet.note && packet.note.trim() !== "" && (
              <ul className="list-disc ml-6">
                <li className="">{packet.note}</li>
              </ul>
            )} */}
                    </div>
                ))}
            </div>

            <div className="text-left my-2 pb-2 grid grid-cols-2 gap-[1%] border-b border-dashed border-black">
                <p>Total Harga</p>
                <p>: Rp. {new Intl.NumberFormat('id-ID').format(dataDetail?.data?.price_sum || 0)}</p>
            </div>

            <p className="text-center mt-4">
                {new Date(dataDetail?.data?.created_at).toLocaleString()}
            </p>
            <p className="text-center">Cetak : Waroeng Aceh Garuda</p>
        </div>
    );
});

export default TableReceiptAdmin;
