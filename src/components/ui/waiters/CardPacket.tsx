/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  quantity: number;
}

interface CardPacketProps {
  id?: string;
  onClick: any;
  name: string;
  src: string;
  price: number;
  product: Product[];
}
const CardPacket: React.FC<CardPacketProps> = ({
  id,
  onClick,
  name,
  src,
  price,
  product,
}) => {
  return (
    <>
      <div
        key={id}
        onClick={onClick}
        className="w-full max-w-[180px] min-h-[192px] bg-white rounded-md p-2 cursor-pointer"
      >
        <div className="w-full h-[120px] rounded-md flex items-center justify-center overflow-hidden">
          <Image
            src={src}
            width={100}
            height={100}
            alt={name}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        <p className="font-semibold text-sm mt-2">{name}</p>
        <ul>
          {product.map((item) => (
            <li key={item.id} className="text-[9px] list-disc ml-4">
              <span className="flex space-x-1">
                <p>{item.quantity} x </p>
                <p>{item.name}</p>
              </span>
            </li>
          ))}
        </ul>
        <p className="font-semibold text-primaryColor text-sm text-end">
          Rp. {price}
        </p>
      </div>
    </>
  );
};

export default CardPacket;
