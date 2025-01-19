import React from 'react';

type Product = {
    id: string;
    name: string;
    quantity: number;
    note?: string;
};

type Data = {
    id: string;
    no_transaksi: string;
    time: string;
    customer: string;
    table: string;
    products: Product[];
};

type TableTestProps = {
    data: Data | null;
};

const TableTest: React.FC<TableTestProps> = ({ data }) => {
    if (!data) return null;

    return (
        <div className="flex justify-center w-full print:w-full">
            <div
                id="struk"
                className="bg-white p-4 text-[13.5px] min-w-[280px] w-full max-w-[380px] print:max-w-full print:w-full print:shadow-none"
                style={{
                    pageBreakInside: 'avoid',
                    pageBreakAfter: 'always',
                    minHeight: 'fit-content'
                }}
            >
                <div className="text-center border-b border-dashed border-black pb-2">
                    <p className="uppercase text-center font-medium">Checker</p>
                </div>

                <div className="text-left mt-4 space-y-1 pb-2 border-b border-dashed border-black">
                    <div className="flex">
                        <p className="w-28">No Transaksi</p>
                        <p>: {data.no_transaksi}</p>
                    </div>
                    <div className="flex">
                        <p className="w-28">Waktu</p>
                        <p>: {data.time}</p>
                    </div>
                    <div className="flex">
                        <p className="w-28">Nama Pemesan</p>
                        <p>: {data.customer}</p>
                    </div>
                    <div className="flex">
                        <p className="w-28">Nomor Meja</p>
                        <p>: {data.table}</p>
                    </div>
                </div>

                {/* <div className="text-left mt-6 grid grid-cols-2 pb-2 border-b border-dashed border-black">
                    <p>No Transaksi</p>
                    <p>: {data.no_transaksi}</p>
                    <p>Waktu</p>
                    <p>: {data.time}</p>
                    <p>Nama Pemesan</p>
                    <p>: {data.customer}</p>
                    <p>Nomor Meja</p>
                    <p>: {data.table}</p>
                </div> */}

                {/* <div className="mt-2 space-y-2 border-b border-dashed border-black pb-2">
                    {data.products.map((product) => (
                        <div key={product.id}>
                            <div className="flex space-x-2">
                                <p className="w-8">{product.quantity}x</p>
                                <p className="flex-1">{product.name}</p>
                            </div>
                            {product.note && product.note.trim() !== "" && (
                                <div className="ml-8 text-sm">
                                    <p>* {product.note}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div> */}
                <div className="mt-2 space-y-2 border-b border-dashed border-black pb-2">
                    {data.products.map((product) => (
                        <div key={product.id}>
                            <span className="flex space-x-2">
                                <p>{product.quantity}x</p>
                                <p>{product.name}</p>
                            </span>
                            {product.note && product.note.trim() !== "" && (
                                <ul className="list-disc ml-6">
                                    <li className="">{product.note}</li>
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className="text-center space-y-1 mt-4">
                    <p>{data.time}</p>
                    <p>Cetak : Waroeng Aceh Garuda</p>
                </div>
            </div>
        </div>
    );
};

export default TableTest;