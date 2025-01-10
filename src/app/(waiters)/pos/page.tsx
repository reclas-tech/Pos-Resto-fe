"use client";
import Image from "next/image";
import { DarkModeComponents } from "@/components/ui/darkModeButton";
import { NotesSVG, HistorySVG, CustomerSVG } from "@/constants/svgIcons";
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
import FormModal from "@/components/ui/waiters/modal/FormModal";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";

interface Product {
  id: string;
  name: string;
  price: string;
  src: string;
  quantity?: number; // quantity bisa jadi undefined pada saat produk belum ditambahkan
  note?: string;
}

interface CustomerOrder {
  type: "takeaway" | "dineIn";
  customerName: string;
}

function PosPage() {
  const products = [
    {
      id: "1",
      name: "Steak",
      price: "15.000",
      src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c5ff7a56-6965-4066-9a80-d09ec285b8f2/W+NIKE+P-6000.png",
    },
    {
      id: "2",
      name: "Ayam Bakar",
      price: "15.000",
      src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c5ff7a56-6965-4066-9a80-d09ec285b8f2/W+NIKE+P-6000.png",
    },
    {
      id: "3",
      name: "Sop Iga",
      price: "15.000",
      src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/c5ff7a56-6965-4066-9a80-d09ec285b8f2/W+NIKE+P-6000.png",
    },
  ];

  const [productOrder, setProductOrder] = useState<Product[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isTakeAwayModal, setIsTakeAwayModal] = useState<boolean>(false);
  const [isDineInModal, setIsDineInModal] = useState<boolean>(false);
  const [customerOrder, setCustomerOrder] = useState<CustomerOrder | null>(
    null
  );
  const [isNoteModal, setIsNoteModal] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  let isName: string = "";

  // Handle Open Note Modal
  const handleOpenNoteModal = (productId: string) => {
    setSelectedProductId(productId);
    const product = productOrder.find((p) => p.id === productId);
    if (product?.note) {
      setNoteValue("note", product.note);
    }
    setIsNoteModal(true);
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

  // Note Submit Modal useForm
  const {
    register: registerNote,
    handleSubmit: handleSubmitNote,
    reset: resetNote,
    setValue: setNoteValue,
  } = useForm();

  // Take Away Submit
  const takeAwaySubmit = (data) => {
    setCustomerOrder({
      type: "takeaway",
      customerName: data.name,
    });
    isName = data.name;
    console.log("Take Away Customer Name:", data, isName);
    setIsTakeAwayModal(false);
    resetTakeAway();
  };

  // Dine In Submit
  const dineInSubmit = (data) => {
    setCustomerOrder({
      type: "dineIn",
      customerName: data.name,
    });
    isName = data.name;
    console.log("Dine In:", data, isName);
    setIsDineInModal(false);
    resetDineIn();
  };

  // Note Submit
  const noteSubmit = (data) => {
    if (!selectedProductId) return;

    setProductOrder(
      productOrder.map((product) =>
        product.id === selectedProductId
          ? { ...product, note: data.note }
          : product
      )
    );
    console.log("Updated product order with note:", data);
    resetNote();
    setIsNoteModal(false);
  };

  // Calculate Item TotalS
  const calculateItemTotal = (price: string, quantity: number = 0) => {
    const numericPrice = parseInt(price.replace(/\./g, ""), 10);
    return formatCurrency(numericPrice * quantity);
  };

  // Calculate Order Totals
  const calculateSubTotal = () => {
    return productOrder.reduce((total, item) => {
      const price = parseInt(item.price.replace(/\./g, ""), 10);
      return total + price * (item.quantity || 0);
    }, 0);
  };

  const calculateTax = (subTotal: number) => {
    return Math.round(subTotal * 0.1); // 10% tax
  };

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

  const subTotal = calculateSubTotal();
  const tax = calculateTax(subTotal);
  const total = calculateTotal(subTotal, tax);

  useEffect(() => {
    console.log(productOrder);
  }, [productOrder]);

  return (
    <>
      <div className="flex w-full h-screen ">
        <DarkModeComponents />
        {/* Header */}
        <div
          id="header"
          className="w-[70%] lg:w-[75%] min-w-[793px] h-full flex flex-col"
        >
          <div className="w-full px-4 h-[74px] flex items-center justify-between border-b-2 border-[#E4E4E4]">
            <div className="flex items-center space-x-2">
              <div className="w-11 h-[52px]">
                <Image
                  src={logo}
                  alt="logo"
                  className="w-full h-full"
                  unoptimized
                />
              </div>
              <div>
                <p className="font-semibold">Point of Sale</p>
                <p className="font-normal text-[#828487]">Warung Aceh Garuda</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 lg:space-x-10">
              <button className="text-primaryColor font-semibold flex items-center space-x-1">
                <NotesSVG /> <p>Pesanan</p>
              </button>
              <button className="text-[#737791] flex items-center space-x-1">
                <HistorySVG /> <p>Riwayat</p>
              </button>

              <div className="flex items-center">
                <div>
                  <p>Ahmad</p>
                  <p className="text-[#737791]">Pelayan</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <ChevronDown className="text-[#737791] w-6 h-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="transition-all duration-300 ease-in-out opacity-1 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 bg-white border border-gray-300 shadow-2xl rounded-md">
                    <DropdownMenuLabel className="font-normal text-[#737791] text-sm w-full">
                      <Link href="">Keluar</Link>
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="w-full px-4 h-[74px] flex items-center justify-between border-b-2 border-[#E4E4E4]">
            {/* Search & Filter Paket */}
            <div
              id="search-filter"
              className="flex items-center space-x-4 w-[45%]"
            >
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-primaryColor" />
                </div>
                <Input
                  placeholder="Pencarian"
                  className="rounded-full pl-10 border-primaryColor"
                />
              </div>
              <button className="rounded-full py-2 px-4 border border-secondaryColor text-secondaryColor hover:bg-secondaryColor hover:text-white whitespace-nowrap">
                Paket
              </button>
            </div>
            <div
              id="category"
              className="flex items-center space-x-4 max-w-[45%] overflow-x-auto"
            >
              <button className="rounded-full py-2 px-4 border border-primaryColor text-primaryColor bg-[#FFF5EE] whitespace-nowrap">
                Semua
              </button>
              <button className="rounded-full py-2 px-4 border border-primaryColor text-primaryColor bg-[#FFF5EE] whitespace-nowrap">
                Makanan
              </button>
              <button className="rounded-full py-2 px-4 border border-primaryColor text-primaryColor bg-[#FFF5EE] whitespace-nowrap">
                Minuman
              </button>
              <button className="rounded-full py-2 px-4 border border-primaryColor text-primaryColor bg-[#FFF5EE] whitespace-nowrap">
                Snack
              </button>
            </div>
          </div>
          {/* Display Product */}
          <div className="flex-1 w-full p-4 bg-red-200 overflow-hidden">
            {/* Card Product */}
            <div
              id="display-product"
              className="w-full h-full px-2 grid grid-cols-4 gap-4 overflow-y-auto pb-6"
            >
              {products.map((product) => (
                <CardProduct
                  key={product.id}
                  onClick={() => addProduct(product)}
                  id={product.id}
                  name={product.name}
                  src={product.src}
                  price={product.price}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          id="sidebar"
          className="w-[30%] lg:w-[25%] min-w-[340px] h-full flex flex-col border-l-2 border-[#E4E4E4]"
        >
          {/* SideBar */}
          <div className="w-full  min-h-[150px] py-4 px-6 lg:h-[20%] space-y-1">
            <p className="text-xl font-bold">Detail Pesanan</p>
            <div className="flex justify-between w-full">
              {/* Trigger DineIn Modal */}
              <Button
                onClick={() => setIsDineInModal(true)}
                className="rounded-full w-[49%] bg-primaryColor hover:bg-primaryColor shadow-none"
              >
                Pilih Meja
              </Button>
              {/* Trigger TakeAway Modal */}
              <Button
                onClick={() => setIsTakeAwayModal(true)}
                className="rounded-full w-[49%]"
              >
                Take Away
              </Button>
            </div>
            {/* Display Cuustomer Data */}
            <div
              className={`flex ${
                !customerOrder ? "justify-end" : "justify-between"
              }`}
            >
              {customerOrder && (
                <div className="space-y-2">
                  <p
                    className={`font-semibold ${
                      customerOrder.type === "takeaway"
                        ? "text-secondaryColor"
                        : "text-primaryColor"
                    }`}
                  >
                    {customerOrder.type === "takeaway"
                      ? "Take Away"
                      : "Dine In"}
                  </p>
                  <span className="flex space-x-2 items-center font-semibold text-xs text-[#334155]">
                    <CustomerSVG />
                    <p>{customerOrder.customerName}</p>
                  </span>
                </div>
              )}
              <div id="time">
                <p className="text-[#334155] font-semibold">{currentDate}</p>
                <p className="text-[#334155] text-sm">{currentTime}</p>
              </div>
            </div>

            {/* Take Away Modal */}
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

            {/* Dine In Modal */}
            <FormModal
              isOpen={isDineInModal}
              onClose={() => setIsDineInModal(false)}
              onSubmit={handleSubmitDineIn(dineInSubmit)}
              title="Pilih Meja"
            >
              <Label className="text-xs text-[#828487] font-medium">
                Nama Pelanggan
              </Label>
              <Input
                className="mt-1 rounded-xl text-sm"
                type="text"
                id="name"
                placeholder="Nama "
                {...registerDineIn("name")}
              />
            </FormModal>
          </div>
          <div className="flex-1 w-full py-2 px-6 border-y-[#E4E4E4] border-y-2 overflow-hidden">
            {/* Button Remove Cart */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setProductOrder([])}
                className="bg-[#FF57241A] p-1 rounded-md text-[#EE1616] flex items-center space-x-1"
              >
                <Trash className="w-4 h-4" />
                <p>Hapus Semua</p>
              </button>
            </div>

            <div className="h-[calc(100%-40px)] overflow-y-auto">
              {/* Display Product Order */}

              {productOrder.map((item) => (
                <ProductOrder
                  key={item.id}
                  id={item.id}
                  note={item.note || ""}
                  name={item.name}
                  src={item.src}
                  price={calculateItemTotal(item.price, item.quantity)}
                  quantity={item.quantity || 0}
                  onDelete={() => handleRemoveProduct(item)}
                  onIncrease={() => handleIncreaseQuantity(item)}
                  onDecrease={() => handleDecreaseQuantity(item)}
                  onNote={() => handleOpenNoteModal(item.id)}
                />
              ))}
              {/* Note Modal */}
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
            </div>
          </div>

          <div className="w-full min-h-[200px] py-4 px-6 space-y-3">
            <div className="w-full flex items-center justify-between">
              <p className="text-[#828487] font-normal">Sub Total</p>
              {/* Sub Total */}
              <p className="font-semibold">{formatCurrency(subTotal)}</p>
            </div>
            <div className="w-full flex items-center border-b-2 border-dashed border-[#E4E4E4] pb-3 justify-between">
              <p className="text-[#828487] font-normal">Pajak (10%)</p>
              {/* Pajak */}
              <p className="font-semibold">{formatCurrency(tax)}</p>
            </div>
            <div className="w-full flex items-center pb-3 justify-between">
              <p className="text-[#828487] font-normal">Total</p>
              {/* Total */}
              <p className="font-semibold text-primaryColor">
                {formatCurrency(total)}
              </p>
            </div>

            <Button className="w-full rounded-full bg-primaryColor text-lg h-12 hover:bg-primaryColor">
              Buat Pesanan
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PosPage;
