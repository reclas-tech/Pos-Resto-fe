"use client";
import Image from "next/image";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import { CustomerSVG, HistorySVG, NotesSVG } from "@/constants/svgIcons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@assets/splashScreen.png";
import { ChevronDown, Search, Trash } from "lucide-react";
import CardProduct from "@/components/ui/waiters/CardProduct";
import ProductOrder from "@/components/ui/waiters/ProductOrder";
import CardPacket from "@/components/ui/waiters/CardPacket";
import PacketOrder from "@/components/ui/waiters/PacketOrder";
import FormModal from "@/components/ui/waiters/modal/FormModal";
import ChoseTableModal from "@/components/ui/waiters/modal/ChoseTableModal";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import useSWR from "swr";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  note?: string;
  stock: number;
}

interface Packet {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  note?: string;
  products: Product[];
}

interface CustomerOrder {
  type: "takeaway" | "dineIn";
  customerName: string;
  tableIds?: string[]; // Add tableIds for dineIn orders
  tableNames?: string[]; // Add tableNames for display
}

function PosPage() {
  // Product Dummy Data

  // Tables Dumy Data
  const tables = [
    { id: "1", status: "tersedia", name: "T-1" },
    { id: "2", status: "terisi", name: "T-2" },
    { id: "3", status: "tersedia", name: "T-3" },
    { id: "4", status: "tersedia", name: "T-4" },
    { id: "5", status: "terisi", name: "T-5" },
    { id: "6", status: "terisi", name: "T-6" },
    { id: "7", status: "tersedia", name: "T-7" },
    { id: "8", status: "terisi", name: "T-8" },
    { id: "9", status: "tersedia", name: "T-9" },
    { id: "10", status: "terisi", name: "T-10" },
    { id: "11", status: "tersedia", name: "T-11" },
    { id: "12", status: "terisi", name: "T-12" },
    { id: "13", status: "tersedia", name: "T-13" },
    { id: "14", status: "terisi", name: "T-14" },
    { id: "15", status: "tersedia", name: "T-15" },
    { id: "16", status: "terisi", name: "T-16" },
    { id: "17", status: "tersedia", name: "T-17" },
    { id: "18", status: "terisi", name: "T-18" },
    { id: "19", status: "tersedia", name: "T-19" },
    { id: "20", status: "terisi", name: "T-20" },
  ];

  // Packet Dummy Data
  // const packets = [
  //   {
  //     id: "1",
  //     name: "Paket 1",
  //     price: 150000,
  //     src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c5ff7a56-6965-4066-9a80-d09ec285b8f2/W+NIKE+P-6000.png",
  //     product: [{ id: "1", name: "Rendang", quantity: 2 }],
  //   },
  // ];

  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();
  const search = "";
  const categoryId = "";

  // Fetch Product
  const { data: dataProducts } = useSWR(`/product/waiter/all`, () =>
    axiosPrivate
      .get(`/product/waiter/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data)
  );

  // Fetch Packet
  const { data: dataPackets } = useSWR(`/packet/waiter/all`, () =>
    axiosPrivate
      .get(`/packet/waiter/all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data)
  );

  const [productOrder, setProductOrder] = useState<Product[]>([]);
  const [packetOrder, setPacketOrder] = useState<Packet[]>([]);

  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isTakeAwayModal, setIsTakeAwayModal] = useState<boolean>(false);
  const [isDineInModal, setIsDineInModal] = useState<boolean>(false);
  const [customerOrder, setCustomerOrder] = useState<CustomerOrder | null>(
    null
  );
  const [isNoteModal, setIsNoteModal] = useState<boolean>(false);
  const [isNotePacketModal, setIsNotePacketModal] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [selectedPacketId, setSelectedPacketId] = useState<string>("");

  const [isActiveFilterProduct, setIsActiveFilterProduct] =
    useState<string>("Semua");
  const [isActiveFilterTable, setIsActiveFilterTable] =
    useState<string>("Semua");

  const [filteredTables, setFilteredTables] = useState(tables);
  const [selectedTables, setSelectedTables] = useState<
    { id: string; name: string }[]
  >([]);

  // Handle Filter Product
  const handleFilterProductClick = (filter: React.SetStateAction<string>) => {
    setIsActiveFilterProduct(filter);
    console.log(`Filter aktif: ${filter}`);
  };

  //  Open NoteProduct Modal
  const handleOpenNoteModal = (productId: string) => {
    setSelectedProductId(productId);
    const product = productOrder.find((p) => p.id === productId);
    if (product?.note) {
      setNoteValue("note", product.note);
    }
    setIsNoteModal(true);
  };

  // Open NotePacket Modal
  const handleOpenNotePacketModal = (packetId: string) => {
    setSelectedPacketId(packetId);
    const data = packetOrder.find((p) => p.id === packetId);
    if (data?.note) {
      setNoteValuePacket("note", data.note);
    }
    setIsNotePacketModal(true);
  };

  // Handle Filter Table
  const handleFilterTableClick = (filter: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActiveFilterTable(filter);

    if (filter === "Semua") {
      setFilteredTables(tables);
    } else if (filter === "Tersedia") {
      setFilteredTables(tables.filter((table) => table.status === "tersedia"));
    } else if (filter === "Terisi") {
      setFilteredTables(tables.filter((table) => table.status === "terisi"));
    }
  };

  // Chose Table Function
  const handleTableSelect = (
    tableId: string,
    tableName: string,
    status: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "tersedia") {
      setSelectedTables((prev) => {
        const isSelected = prev.some((table) => table.id === tableId);
        if (isSelected) {
          return prev.filter((table) => table.id !== tableId);
        }
        return [...prev, { id: tableId, name: tableName }];
      });
    }
  };

  // Dine In Submit Modal useForm
  const {
    register: registerDineIn,
    handleSubmit: handleSubmitDineIn,
    reset: resetDineIn,
  } = useForm();

  // Take Away Submit Modal useForm
  const {
    register: registerTakeAway,
    handleSubmit: handleSubmitTakeAway,
    reset: resetTakeAway,
  } = useForm();

  // Note Product  useForm
  const {
    register: registerNote,
    handleSubmit: handleSubmitNote,
    reset: resetNote,
    setValue: setNoteValue,
  } = useForm();

  // Note Packet  useForm
  const {
    register: registerNotePacket,
    handleSubmit: handleSubmitNotePacket,
    reset: resetNotePacket,
    setValue: setNoteValuePacket,
  } = useForm();

  //  Order Submit useForm
  const { handleSubmit: handleSubmitOrder, reset: resetOrder } = useForm();

  // Take Away Submit
  const takeAwaySubmit = (data) => {
    setCustomerOrder({
      type: "takeaway",
      customerName: data.name,
    });
    // console.log(data);
    setIsTakeAwayModal(false);
    resetTakeAway();
  };

  // Dine In Submit
  const dineInSubmit = (data) => {
    if (selectedTables.length === 0) {
      // Optional: Add error handling for no table selected
      return;
    }

    setCustomerOrder({
      type: "dineIn",
      customerName: data.name,
      tableIds: selectedTables.map((table) => table.id),
      tableNames: selectedTables.map((table) => table.name),
    });
    // console.log(customerOrder);
    setIsDineInModal(false);
    resetDineIn();
    setSelectedTables([]); // Reset selected tables after submission
  };

  // Note Product Submit
  const noteSubmit = (data: Product) => {
    if (!selectedProductId) return;

    setProductOrder(
      productOrder.map((product) =>
        product.id === selectedProductId
          ? { ...product, note: data.note }
          : product
      )
    );
    // console.log(data);
    resetNote();
    setIsNoteModal(false);
  };

  // Note Packet Submit
  const notePacketSubmit = (data: Packet) => {
    if (!selectedPacketId) return;

    setPacketOrder(
      packetOrder.map((packet) =>
        packet.id === selectedPacketId ? { ...packet, note: data.note } : packet
      )
    );
    // console.log(data);
    resetNotePacket();
    setIsNotePacketModal(false);
  };

  // Calculate Item TotalS
  const calculateItemTotal = (price: number, quantity: number = 0) => {
    return formatCurrency(price * quantity);
  };

  // Calculate Order Total
  const calculateSubTotal = () => {
    const productTotal = productOrder.reduce((total, item) => {
      return total + item.price * (item.quantity || 0);
    }, 0);

    const packetTotal = packetOrder.reduce((total, item) => {
      return total + item.price * (item.quantity || 0);
    }, 0);

    return productTotal + packetTotal;
  };

  // Calculate Order Tax
  const calculateTax = (subTotal: number) => {
    return Math.round(subTotal * 0.1); // 10% tax
  };

  // Calculate Order Total + Tax
  const calculateTotal = (subTotal: number, tax: number) => {
    return subTotal + tax;
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  // Update date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      // Format date
      const dateFormatter = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // Format time
      const timeFormatter = new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      setCurrentDate(dateFormatter.format(now));
      setCurrentTime(timeFormatter.format(now) + " WIB");
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const addProduct = (item: Product) => {
    if (productOrder.some((productItem) => productItem.id === item.id)) {
      setProductOrder((prevProductOrder) =>
        prevProductOrder.map((productItem) =>
          productItem.id === item.id
            ? {
                ...productItem,
                quantity: (productItem.quantity || 0) + 1,
                note: "",
              }
            : productItem
        )
      );
      return;
    }
    setProductOrder((prevProductOrder) => [
      ...prevProductOrder,
      { ...item, quantity: 1, note: "" },
    ]);
  };

  const handleIncreaseQuantity = (item: Product) => {
    setProductOrder(
      productOrder.map((product) =>
        product.id === item.id
          ? { ...product, quantity: (product.quantity || 0) + 1 }
          : product
      )
    );
  };
  const handleDecreaseQuantity = (item: Product) => {
    setProductOrder(
      productOrder.map((product) =>
        product.id === item.id && (product.quantity || 0) > 1
          ? { ...product, quantity: (product.quantity || 0) - 1 }
          : product
      )
    );
  };

  const handleRemoveProduct = (item: Product) => {
    setProductOrder(productOrder.filter((product) => product.id !== item.id));
  };

  const addPacket = (item: Packet) => {
    if (packetOrder.some((packetItem) => packetItem.id === item.id)) {
      setPacketOrder((prevPacketOrder) =>
        prevPacketOrder.map((packetItem) =>
          packetItem.id === item.id
            ? {
                ...packetItem,
                quantity: (packetItem.quantity || 0) + 1,
                note: "",
              }
            : packetItem
        )
      );
      return;
    }
    setPacketOrder((prevPacketOrder) => [
      ...prevPacketOrder,
      { ...item, quantity: 1, note: "" },
    ]);
  };

  const handleIncreaseQuantityPacket = (item: Packet) => {
    setPacketOrder(
      packetOrder.map((packet) =>
        packet.id === item.id
          ? { ...packet, quantity: (packet.quantity || 0) + 1 }
          : packet
      )
    );
  };
  const handleDecreaseQuantityPacket = (item: Packet) => {
    setPacketOrder(
      packetOrder.map((packet) =>
        packet.id === item.id && (packet.quantity || 0) > 1
          ? { ...packet, quantity: (packet.quantity || 0) - 1 }
          : packet
      )
    );
  };

  const handleRemovePacket = (item: Packet) => {
    setPacketOrder(packetOrder.filter((packet) => packet.id !== item.id));
  };

  const RemoveAll = () => {
    setProductOrder([]);
    setPacketOrder([]);
  };

  const subTotal = calculateSubTotal();
  const tax = calculateTax(subTotal);
  const total = calculateTotal(subTotal, tax);

  //  Order Submit
  const orderSubmit = () => {
    const orderData = {
      products: productOrder.map((product) => ({
        id: product.id,
        quantity: product.quantity || 0,
        price_sum: product.price * (product.quantity || 0),
        note: product.note || "",
      })),
      packets: packetOrder.map((packet) => ({
        id: packet.id,
        quantity: packet.quantity || 0,
        price_sum: packet.price * (packet.quantity || 0),
        note: packet.note || "",
        products: packet.products,
      })),
      customer: customerOrder?.customerName || "",
      type: customerOrder?.type || "",
      table_id: customerOrder?.tableIds || [],
      tax: calculateTax(calculateSubTotal()),
      price_sum: calculateSubTotal(),
    };

    console.log(orderData);
    // Reset all states after submit
    setProductOrder([]);
    setPacketOrder([]);
    setCustomerOrder(null);
    setSelectedTables([]);
    resetOrder();
  };

  return (
    <>
      <div className="flex w-full h-screen max-w-[1133px] max-h-[744px] ">
        <DarkModeComponents />
        <div className="w-[70%] h-full ">
          {/* Header */}
          <div className=" flex justify-between items-center px-2 py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-[40px]">
                <Image
                  src={logo}
                  alt="logo"
                  className="w-full h-full"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-semibold text-sm">Point of Sale</p>
                <p className="font-normal text-xs text-[#828487]">
                  Warung Aceh Garuda
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-primaryColor text-sm font-semibold flex items-center space-x-1">
                <NotesSVG /> <p>Pesanan</p>
              </button>
              <button className="text-[#737791] text-sm flex items-center space-x-1">
                <HistorySVG /> <p>Riwayat</p>
              </button>

              <div className="flex items-center">
                <div>
                  <p className="text-sm">Ahmad</p>
                  <p className="text-xs text-[#737791]">Pelayan</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <ChevronDown className="text-[#737791] w-5 h-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border border-gray-300 shadow-lg rounded-md">
                    <DropdownMenuLabel className="text-xs text-[#737791]">
                      <Link href="">Keluar</Link>
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center border-y border-[#E4E4E4] px-2 py-4">
            <div className="flex items-center space-x-3 w-[45%]">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-primaryColor" />
                </div>
                <Input
                  placeholder="Pencarian"
                  className="rounded-full pl-8 text-xs h-8 border-primaryColor"
                />
              </div>
              <button
                className={`rounded-full text-xs py-1 px-2 border ${
                  isActiveFilterProduct === "Paket"
                    ? "bg-secondaryColor text-white"
                    : "bg-[#114F44]/10 text-secondaryColor border-secondaryColor"
                }`}
                onClick={() => handleFilterProductClick("Paket")}
              >
                Paket
              </button>
            </div>

            <div className="flex items-center space-x-3 max-w-[45%] overflow-x-auto">
              {["Semua", "Makanan", "Minuman", "Snack"].map((filter) => (
                <button
                  key={filter}
                  className={`rounded-full text-xs py-1 px-2 border ${
                    isActiveFilterProduct === filter
                      ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                      : ""
                  }`}
                  onClick={() => handleFilterProductClick(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 w-full  max-h-[585px] overflow-y-auto px-6 mt-4">
            {/* Data Paket dan product */}
            {isActiveFilterProduct === "Paket"
              ? dataPackets?.data.map((packet: Packet) => (
                  <CardPacket
                    key={packet.id}
                    onClick={() => addPacket(packet)}
                    id={packet.id}
                    name={packet.name}
                    src={packet.image}
                    price={packet.price}
                    product={packet.products}
                  />
                ))
              : dataProducts?.data.map((product: Product) => (
                  <CardProduct
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    src={product.image}
                    price={product.price}
                    onClick={() => addProduct(product)}
                  />
                ))}
          </div>
        </div>
        <div className="w-[30%] h-full border-l border-[#E4E4E4] ">
          <div className="w-full h-[14%]  px-4 space-y-1">
            <p className="text-lg font-bold">Detail Pesanan</p>
            <div className="flex justify-between w-full">
              {/* Trigger DineIn Modal */}
              <Button
                onClick={() => setIsDineInModal(true)}
                className="rounded-full w-[49%] text-xs h-7 bg-primaryColor hover:bg-primaryColor shadow-none"
              >
                Pilih Meja
              </Button>
              {/* Trigger TakeAway Modal */}
              <Button
                onClick={() => setIsTakeAwayModal(true)}
                className="h-7 text-xs rounded-full w-[49%]"
              >
                Take Away
              </Button>
            </div>
            <div
              className={`flex ${
                !customerOrder ? "justify-end" : "justify-between"
              }`}
            >
              {customerOrder && (
                <div className="space-y-1">
                  <p
                    className={`font-semibold text-xs ${
                      customerOrder.type === "takeaway"
                        ? "text-secondaryColor"
                        : "text-primaryColor"
                    }`}
                  >
                    {customerOrder.type === "takeaway"
                      ? "Take Away"
                      : `${customerOrder.tableNames?.join(" / ") || ""}`}
                  </p>
                  <span className="flex space-x-2 items-center font-semibold text-[10px] text-[#334155]">
                    <CustomerSVG />
                    <p>{customerOrder.customerName}</p>
                  </span>
                </div>
              )}
              <div>
                <p className="text-[#334155] text-xs font-semibold">
                  {currentDate}
                </p>
                <p className="text-[#334155] text-[10px]">{currentTime}</p>
              </div>
              {/* Dine In Modal */}
              <ChoseTableModal
                isOpen={isDineInModal}
                onClose={() => setIsDineInModal(false)}
                onSubmit={handleSubmitDineIn(dineInSubmit)}
                title="Pilih Meja"
              >
                <div className="relative px-2 pb-2 border-b-[1px] border-[#E4E4E4] my-0 flex justify-between items-center">
                  <div className="flex space-x-3">
                    <div className="flex space-x-1 items-center text-xs">
                      <div className="flex justify-center items-center aspect-square h-4 w-4 rounded-full bg-[#3395F0]/10 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <div className="h-2.5 w-2.5 bg-[#3395F0]/90 rounded-full" />
                      </div>
                      <span>
                        Tersedia (
                        {
                          tables.filter((table) => table.status === "tersedia")
                            .length
                        }
                        )
                      </span>
                    </div>

                    <div className="flex space-x-1 items-center text-xs">
                      <div className="flex justify-center items-center aspect-square h-4 w-4 rounded-full bg-[#FEA026]/10 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <div className="h-2.5 w-2.5 bg-primaryColor rounded-full" />
                      </div>
                      <span>
                        Terisi (
                        {
                          tables.filter((table) => table.status === "terisi")
                            .length
                        }
                        )
                      </span>
                    </div>
                  </div>

                  <div className="space-x-2 items-center text-xs">
                    <button
                      className={`rounded-3xl text-sm p-1 px-2 h-fit border ${
                        isActiveFilterTable === "Semua"
                          ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                          : "border-gray-300"
                      }`}
                      onClick={(e) => handleFilterTableClick("Semua", e)}
                    >
                      Semua
                    </button>
                    <button
                      className={`rounded-3xl text-sm p-1 px-2 h-fit border ${
                        isActiveFilterTable === "Tersedia"
                          ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                          : "border-gray-300"
                      }`}
                      onClick={(e) => handleFilterTableClick("Tersedia", e)}
                    >
                      Tersedia
                    </button>
                    <button
                      className={`rounded-3xl text-sm p-1 px-2 h-fit border ${
                        isActiveFilterTable === "Terisi"
                          ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                          : "border-gray-300"
                      }`}
                      onClick={(e) => handleFilterTableClick("Terisi", e)}
                    >
                      Terisi
                    </button>
                  </div>
                </div>

                <div className="w-full px-6 py-2">
                  <div className="flex w-full items-center">
                    <div className="w-1/2">
                      <Input
                        className="rounded-xl text-sm"
                        type="text"
                        id="name"
                        placeholder="Nama "
                        {...registerDineIn("name")}
                      />
                    </div>
                    <div className="w-1/2 flex justify-end ">
                      <p className="text-sm py-1 px-2 rounded-2xl bg-secondaryColor text-white">
                        {selectedTables.length > 0
                          ? selectedTables
                              .map((table) => table.name)
                              .join(" / ")
                          : ""}
                      </p>
                    </div>
                  </div>
                  {/* Display Data Table */}
                  <div className="grid grid-cols-5 gap-5 pt-4 *:aspect-square max-h-[400px] w-full">
                    {filteredTables.map((data) => (
                      <button
                        key={data.id}
                        onClick={(e) =>
                          handleTableSelect(data.id, data.name, data.status, e)
                        }
                        disabled={data.status === "terisi"}
                        className={`rounded-lg border p-1 
        ${
          data.status === "terisi"
            ? "border-[#FEA026] cursor-not-allowed opacity-50"
            : selectedTables.some((table) => table.id === data.id)
            ? "border-[#114F44]"
            : "border-[#3395F0]"
        } 
        flex items-center justify-center w-20 h-20`}
                      >
                        <div
                          className={`p-1 rounded-full 
          ${
            data.status === "terisi"
              ? "bg-[#FEA026]/10"
              : selectedTables.some((table) => table.id === data.id)
              ? "bg-[#114F44]/10"
              : "bg-[#3395F0]/10"
          } 
          flex items-center justify-center w-10 h-10`}
                        >
                          <span
                            className={`font-bold text-xs 
            ${
              data.status === "terisi"
                ? "text-[#FEA026]"
                : selectedTables.some((table) => table.id === data.id)
                ? "text-[#114F44]"
                : "text-[#3395F0]"
            }`}
                          >
                            {data.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </ChoseTableModal>

              {/* Take Away  Modal */}
              <FormModal
                isOpen={isTakeAwayModal}
                onClose={() => setIsTakeAwayModal(false)}
                onSubmit={handleSubmitTakeAway(takeAwaySubmit)}
                title="Pelanggan Take Away"
              >
                <Label className="text-xs text-[#828487] font-medium">
                  Nama Pelanggan
                </Label>
                <Input
                  className="mt-1 rounded-xl text-sm"
                  type="text"
                  id="name"
                  placeholder="Nama "
                  {...registerTakeAway("name")}
                />
              </FormModal>
            </div>
          </div>
          <div className="w-full h-[57%] border-y border-[#E4E4E4] px-4 ">
            <div className="flex justify-end my-2">
              <button
                onClick={RemoveAll}
                className="bg-[#FF57241A] p-1 rounded text-[#EE1616] text-xs flex items-center space-x-1"
              >
                <Trash className="w-4 h-4" />
                <p>Hapus Semua</p>
              </button>
            </div>
            <div className="  overflow-y-auto space-y-2 max-h-[90%]">
              {packetOrder.map((item) => (
                <PacketOrder
                  key={item.id}
                  id={item.id}
                  note={item.note || ""}
                  name={item.name}
                  src={item.image}
                  price={calculateItemTotal(item.price, item.quantity)}
                  product={item.products}
                  quantity={item.quantity || 0}
                  onDelete={() => handleRemovePacket(item)}
                  onIncrease={() => handleIncreaseQuantityPacket(item)}
                  onDecrease={() => handleDecreaseQuantityPacket(item)}
                  onNote={() => handleOpenNotePacketModal(item.id)}
                />
              ))}

              {/* Display product orders */}
              {productOrder.map((item) => (
                <ProductOrder
                  key={item.id}
                  id={item.id}
                  note={item.note || ""}
                  name={item.name}
                  src={item.image || ""}
                  price={calculateItemTotal(item.price, item.quantity)}
                  quantity={item.quantity || 0}
                  onDelete={() => handleRemoveProduct(item)}
                  onIncrease={() => handleIncreaseQuantity(item)}
                  onDecrease={() => handleDecreaseQuantity(item)}
                  onNote={() => handleOpenNoteModal(item.id)}
                />
              ))}
              {/* Note Product Modal */}
              <FormModal
                isOpen={isNoteModal}
                onClose={() => {
                  setIsNoteModal(false);
                  resetNote();
                  setSelectedProductId("");
                }}
                onSubmit={handleSubmitNote(noteSubmit)}
                title="Catatan"
              >
                <Label className="text-xs text-[#828487] font-medium">
                  Masukkan Catatan
                </Label>
                <textarea
                  id="note"
                  className="flex mt-1 h-[147px] w-full rounded-xl border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
                  placeholder="Catatan"
                  {...registerNote("note")}
                ></textarea>
              </FormModal>

              {/* Note Packet Modal */}
              <FormModal
                isOpen={isNotePacketModal}
                onClose={() => {
                  setIsNotePacketModal(false);
                  resetNotePacket();
                  setSelectedProductId("");
                }}
                onSubmit={handleSubmitNotePacket(notePacketSubmit)}
                title="Catatan"
              >
                <Label className="text-xs text-[#828487] font-medium">
                  Masukkan Catatan
                </Label>
                <textarea
                  id="note"
                  className="flex mt-1 h-[147px] w-full rounded-xl border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primaryColor disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
                  placeholder="Catatan"
                  {...registerNotePacket("note")}
                ></textarea>
              </FormModal>
            </div>
          </div>
          <div className="w-full mt-1">
            <form onSubmit={handleSubmitOrder(orderSubmit)}>
              {/* Sesuaikan sub total, pajak, dan total berdasarkan jumlah data packetOrder dan productOrder yang ditampilkan */}
              <div className="w-full  py-4 px-6 space-y-3">
                <div className="w-full text-sm  flex items-center justify-between">
                  <p className="text-[#828487] font-normal">Sub Total</p>
                  {/* Sub Total */}
                  <p className="font-semibold">{formatCurrency(subTotal)}</p>
                </div>
                <div className="w-full text-sm  flex items-center border-b-2 border-dashed border-[#E4E4E4] pb-3 justify-between">
                  <p className="text-[#828487] font-normal">Pajak (10%)</p>
                  {/* Pajak */}
                  <p className="font-semibold">{formatCurrency(tax)}</p>
                </div>
                <div className="w-full flex text-sm items-center pb-3 justify-between">
                  <p className="text-[#828487] font-normal">Total</p>
                  {/* Total */}
                  <p className="font-semibold text-primaryColor">
                    {formatCurrency(total)}
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full  font-semibold bg-primaryColor text-sm h-9  hover:bg-primaryColor"
                >
                  Buat Pesanan
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PosPage;
