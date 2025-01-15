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

type TableReceiptProps = {
  data: Data | null; // Data bisa null jika tidak tersedia
};

const TableReceipt: React.FC<TableReceiptProps> = ({ data }) => {
  if (!data) return null;
  return (
    <div
      id="struk"
      className="bg-white p-4 text-[13.5px] w-80 min-w-[320px] max-w-[380px] shadow-md"
    >
      <p className="uppercase text-center font-medium">Checker</p>

      <div className="text-left mt-6 grid grid-cols-2 pb-2 border-b border-dashed border-black">
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

      <p className="text-center mt-4">{data.time}</p>
      <p className="text-center">Cetak : Waroeng Aceh Garuda</p>
    </div>
  );
};

export default TableReceipt;

// Example Use
//  const dataTableReceipt = [
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
//        },
//        {
//          id: "2",
//          quantity: 1,
//          name: "Es Teh",
//        },
//      ],
//    },
//  ];

//  <TableReceipt data={dataTableReceipt[0]} />;


