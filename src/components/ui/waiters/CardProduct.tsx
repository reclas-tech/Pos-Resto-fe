/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

interface CardProductProps {
  id?: string;
  onClick: any;
  name: string;
  src: string;
  price: string;
}
const CardProduct: React.FC<CardProductProps> = ({
  id,
  onClick,
  name,
  src,
  price,
}) => {
  return (
    <>
      <div
        key={id}
        onClick={onClick}
        className="w-full max-w-[180px] h-[192px] bg-white rounded-md p-2 cursor-pointer"
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
        <p className="font-semibold text-primaryColor text-sm text-end">
          Rp. {price}
        </p>
      </div>
    </>
  );
};

export default CardProduct;
