/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductInPacket } from "@/components/parts/waiters/interface";
import Image from "next/image";

interface CardPacketProps {
  id?: string;
  onClick: any;
  name: string;
  src: string;
  price: number;
  products: ProductInPacket[];
}

const CardPacket: React.FC<CardPacketProps> = ({
  id,
  onClick,
  name,
  src,
  price,
  products,
}) => {
  return (
    <>
      <div
        key={id}
        onClick={onClick}
        className="w-full max-w-[180px] min-h-[152px] bg-white rounded-md p-2 cursor-pointer flex flex-col"
      >
        <div className="w-full h-[120px] rounded-md flex items-center justify-center overflow-hidden">
          <Image
            src={src || "/images/notFound.png"}
            width={100}
            height={100}
            alt={name || "Packet not found"}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 flex flex-col">
          <p className="font-semibold text-sm mt-2">{name}</p>
          <ul className="flex-1">
            {products.map((item) => (
              <li key={item.id} className="text-[9px] list-disc ml-4">
                {item.quantity} x {item?.product?.name}
              </li>
            ))}
          </ul>
          <p className="font-semibold text-primaryColor text-sm text-end mt-auto">
            Rp. {price}
          </p>
        </div>
      </div>
    </>
  );
};

export default CardPacket;
