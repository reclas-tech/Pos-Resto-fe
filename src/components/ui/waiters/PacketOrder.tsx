import { ProductInPacket } from "@/components/parts/waiters/interface";
import { DeleteSVG, NoteOrderSVG } from "@/constants/svgIcons";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";


interface PacketOrderProps {
  id: string;
  name: string;
  src: string;
  price: string;
  quantity: number;
  onDelete: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onNote: () => void;
  note: string;
  product: ProductInPacket[];
}

const PacketOrder: React.FC<PacketOrderProps> = ({
  id,
  name,
  src,
  price,
  note,
  quantity,
  onDelete,
  onIncrease,
  onDecrease,
  onNote,
  product,
}) => {
  return (
    <div
      id={id}
      className="w-full flex justify-between items-center pb-4 pr-[2%] border-b-2 border-[#E4E4E4]"
    >
      <div className="flex items-center space-x-2">
        <div className="space-y-2">
          <div className="relative w-[57px] h-[57px] flex justify-center items-center">
            <button
              onClick={onDelete}
              className="absolute inline-block text-[#EE1616] w-4 h-4 right-0 top-0"
            >
              <DeleteSVG />
            </button>
            <div className="w-[50px] h-[50px] rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                width={50}
                height={50}
                src={src}
                alt={name}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          </div>

          <button
            onClick={onNote}
            className="flex space-x-1 text-[9px] font-semibold items-center p-1 text-secondaryColor bg-[#114F440D] rounded-md"
          >
            <NoteOrderSVG />
            <p>Catatan</p>
          </button>
        </div>
        <div className="space-y-2">
          <div className="space-y-1">
            <p className="font-bold text-[#19191C] text-sm">{name}</p>
            <ul className="text-[9px] list-disc ml-5">
              {product.map((item) => (
                <li key={item.id}>{item?.product?.name}</li>
              ))}
            </ul>
            <p className="font-bold text-primaryColor text-xs">{price}</p>
          </div>
          <div className="text-[10px]  text-[#141414CC]">
            <p className="italic font-semibold">Catatan :</p>
            <p className="whitespace-pre-line">
              {note !== "" ? note : "Tidak Ada"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onDecrease}
          className="flex items-center justify-center rounded-full w-7 h-7 bg-[#E4E4E4] text-[#9C9C9C]"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="font-semibold text-sm">{quantity}</span>
        <button
          onClick={onIncrease}
          className="flex items-center justify-center rounded-full w-7 h-7 bg-primaryColor text-white"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PacketOrder;
