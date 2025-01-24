/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import useSWR from "swr";
import { showAlert2 } from "@/lib/sweetalert2";
import { LoadingSVG } from "@/constants/svgIcons";
import { useRouter } from "next/navigation";
import AuthGuardPOS from "@/hooks/authGuardPOS";
import { showAlertDineIn } from "@/lib/sweetalertDineIn";
import TableReceipt from "@/components/ui/struk/TableReceipt";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  type: "take away" | "dine in";
  customerName: string;
  tableIds?: string[];
  tableNames?: string[];
}

interface TableData {
  id: string;
  name: string;
  status: "tersedia" | "terisi";
}

// For form data types
interface TakeAwayFormData {
  name: string;
}

interface DineInFormData {
  name: string;
}

interface NoteFormData {
  note: string;
}

function PosPage() {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const router = useRouter();

  const [categoryId, setCategoryId] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  // Fecth Profile
  const { data: dataProfile, isLoading: isLoadingProfile } = useSWR(
    `/auth/employee/profile`,
    () =>
      axiosPrivate
        .get(`/auth/employee/profile`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data)
  );

  // Fetch Category
  const { data: dataCategory, isLoading: isLoadingCategories } = useSWR(
    `/category/waiter/all`,
    () =>
      axiosPrivate
        .get(`/category/waiter/all`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data)
  );

  // Fetch Product
  const { data: dataProducts, isLoading: isLoadingProducts } = useSWR(
    `/product/waiter/all?category_id=${categoryId}&search=${search}`,
    () =>
      axiosPrivate
        .get(`/product/waiter/all?category_id=${categoryId}&search=${search}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data)
  );

  // Fetch Packet
  const {
    data: dataPackets,

    isLoading: isLoadingPackets,
  } = useSWR(`/packet/waiter/all?search=${search}`, () =>
    axiosPrivate
      .get(`/packet/waiter/all?search=${search}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => res.data)
  );

  // Fetch Table
  const { data: dataTables, isLoading: loadingTables } = useSWR(
    `/table/employee/list?status=${status}`,
    () =>
      axiosPrivate
        .get(`/table/employee/list?status=${status}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
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

  const [selectedTables, setSelectedTables] = useState<
    Array<{
      id: string;
      name: string;
    }>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [orderInvoice, setOrderInvoice] = useState(null);

  const handleLogout = () => {
    setTimeout(() => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("role");
      Cookies.remove("name");
      router.push("/login-waiters");
      showAlert2("success", "Berhasil Logout.");
    }, 10);
  };

  // Search Packet & Product
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Fungsi Filter Product
  const handleFilterProductClick = (
    filter: string,
    categoryId: string = ""
  ) => {
    setIsActiveFilterProduct(filter);
    setCategoryId(categoryId); // Set the category ID for filtering
    console.log(`Filter aktif: ${filter}, Category ID: ${categoryId}`);
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
      setStatus("");
    } else if (filter === "Tersedia") {
      setStatus("tersedia");
    } else if (filter === "Terisi") {
      setStatus("terisi");
    }
  };

  // Chose Table Function
  const handleTableSelect = (
    tableId: string,
    tableName: string,
    status: "tersedia" | "terisi",
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

  // Validation for Dine In & Take Away
  type NameFormData = z.infer<typeof nameSchema>;
  const nameSchema = z.object({
    name: z.string().min(1, { message: "Nama Tidak Boleh Kosong" }),
  });
  // Dine In Submit Modal useForm
  const {
    register: registerDineIn,
    handleSubmit: handleSubmitDineIn,
    reset: resetDineIn,
    formState: { errors: errorsDineIn },
  } = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
  });

  // Take Away Submit Modal useForm
  const {
    register: registerTakeAway,
    handleSubmit: handleSubmitTakeAway,
    reset: resetTakeAway,
    formState: { errors: errorsTakeAway },
  } = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
  });

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
  const takeAwaySubmit = (data: TakeAwayFormData) => {
    setCustomerOrder({
      type: "take away",
      customerName: data.name,
    });
    // console.log(data);
    setIsTakeAwayModal(false);
    resetTakeAway();
  };

  // Dine In Submit
  const dineInSubmit = (data: DineInFormData) => {
    if (selectedTables.length === 0) {
      return;
    }

    setCustomerOrder({
      type: "dine in",
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
  const noteSubmit = (data: NoteFormData) => {
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
  const notePacketSubmit = (data: NoteFormData) => {
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

  // Fungsi Print
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const printReceipt = () => {
    console.log("Print");
    reactToPrintFn();
  };

  // Fetch Invoice
  const fetchInvoice = async (id: string) => {
    try {
      const response = await axiosPrivate.get(
        `order/employee/history/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      setOrderInvoice(response.data.data);

      return response.data;
    } catch (error) {
      console.error("Failed to fetch invoice", error);
      throw error;
    }
  };

  //  Order Submit
  const orderSubmit = async () => {
    try {
      const orderData = {
        products: productOrder.map((product) => ({
          id: product.id,
          quantity: product.quantity || 0,
          note: product.note || "",
        })),
        packets: packetOrder.map((packet) => ({
          id: packet.id,
          quantity: packet.quantity || 0,
          note: packet.note || "",
        })),
        customer: customerOrder?.customerName || "",
        type: customerOrder?.type || "",
        tables: customerOrder?.tableIds || [],
      };

      setLoading(true);

      const response = await axiosPrivate.post(
        "/order/waiter/create",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Add this right after
      await fetchInvoice(response?.data?.data.invoice_id);

      // Show different alerts based on order type
      if (customerOrder?.type === "dine in") {
        showAlertDineIn({
          message: "Pesanan berhasil!",
          onConfirm: () => {
            // Reset states only after confirmation for dine in
            printReceipt();
            setOrderInvoice(null);
          },
        });
        setProductOrder([]);
        setPacketOrder([]);
        setCustomerOrder(null);
        setSelectedTables([]);
        resetOrder();
      } else {
        showAlert2("success", response?.data?.message);
        // Reset states immediately for other types
        setProductOrder([]);
        setPacketOrder([]);
        setCustomerOrder(null);
        setSelectedTables([]);
        resetOrder();
        setOrderInvoice(null);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.data?.[0]?.message ||
        error.response?.data?.message ||
        "Gagal menambahkan data!";
      showAlert2("error", errorMessage);
      // Don't reset states on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthGuardPOS>
        <div className="flex w-full h-screen">
          <DarkModeComponents />
          <div className="w-[65%] h-full  ">
            {/* Header */}
            <div className=" flex justify-between items-center px-2 py-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-10">
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
                    <p className="text-sm">
                      {isLoadingProfile ? "Memuat..." : dataProfile.data.name}
                    </p>
                    <p className="text-xs text-[#737791]">
                      {isLoadingProfile ? "Memuat..." : dataProfile.data.role}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <ChevronDown className="text-[#737791] w-5 h-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-gray-300 shadow-lg rounded-md">
                      <DropdownMenuLabel className="text-xs text-[#737791] hover:text-red-600">
                        <button onClick={() => handleLogout()}>Keluar</button>
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
                  {/* Pencarian data produk dan packet */}
                  <Input
                    placeholder="Pencarian"
                    className="rounded-full pl-8 text-xs h-8 border-primaryColor"
                    value={search}
                    onChange={handleSearchChange}
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
                {/* Filter Category Produk */}
                {isLoadingCategories ? (
                  <p className="text-xs">Memuat....</p>
                ) : (
                  <>
                    <button
                      className={`rounded-full text-xs py-1 px-2 border whitespace-nowrap   ${
                        isActiveFilterProduct === "Semua"
                          ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                          : ""
                      }`}
                      onClick={() => handleFilterProductClick("Semua", "")}
                    >
                      Semua
                    </button>
                    {dataCategory?.data.map((category: any) => (
                      <button
                        key={category.id}
                        className={`rounded-full text-xs py-1 px-2 border whitespace-nowrap   ${
                          isActiveFilterProduct === category.name
                            ? "bg-[#FFF5EE] border-primaryColor text-primaryColor"
                            : ""
                        }`}
                        onClick={() =>
                          handleFilterProductClick(category.name, category.id)
                        }
                      >
                        {category.name}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 w-full  max-h-[73%] overflow-y-auto px-6 mt-[2%]">
              {/* Data Paket dan product */}
              {isLoadingProducts || isLoadingPackets ? (
                <div className="col-span-4 flex justify-center items-center">
                  <p className="text-xs">Memuat...</p>
                </div>
              ) : isActiveFilterProduct === "Paket" ? (
                dataPackets?.data.length > 0 ? (
                  dataPackets.data.map((packet: Packet) => (
                    <CardPacket
                      key={packet.id}
                      onClick={() => addPacket(packet)}
                      id={packet.id}
                      name={packet.name}
                      src={packet.image}
                      price={packet.price}
                      products={packet.products}
                    />
                  ))
                ) : (
                  <div className="col-span-4 flex justify-center items-center">
                    <p className="text-sm text-gray-500">
                      Paket tidak ditemukan
                    </p>
                  </div>
                )
              ) : dataProducts?.data.length > 0 ? (
                dataProducts.data.map((product: Product) => (
                  <CardProduct
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    src={product.image}
                    price={product.price}
                    onClick={() => addProduct(product)}
                  />
                ))
              ) : (
                <div className="col-span-4 flex justify-center items-center">
                  <p className="text-sm text-gray-500">
                    Produk tidak ditemukan
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-[35%] h-full border-l border-[#E4E4E4] ">
            <div className="w-full h-[19%] flex flex-col justify-center px-4 space-y-[2%]">
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
                        customerOrder.type === "take away"
                          ? "text-secondaryColor"
                          : "text-primaryColor"
                      }`}
                    >
                      {customerOrder.type === "take away"
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
                  handleSubmit={handleSubmitDineIn}
                  onSubmit={dineInSubmit}
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
                            dataTables?.data.tables.filter(
                              (table: TableData) => table.status === "tersedia"
                            ).length
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
                            dataTables?.data?.tables.filter(
                              (table: TableData) => table.status === "terisi"
                            ).length
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
                        {errorsDineIn.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errorsDineIn.name.message}
                          </p>
                        )}
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
                    <div className="grid grid-cols-5 gap-5 pt-4  max-h-[300px] overflow-y-auto w-full">
                      {loadingTables ? (
                        <div className="col-span-5 flex justify-center items-center ">
                          <p className="text-xs">Memuat...</p>
                        </div>
                      ) : dataTables?.data.tables.length > 0 ? (
                        dataTables?.data?.tables.map((data: TableData) => (
                          <button
                            key={data.id}
                            onClick={(e) =>
                              handleTableSelect(
                                data.id,
                                data.name,
                                data.status,
                                e
                              )
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
                        ))
                      ) : (
                        <div className="col-span-5 flex justify-center items-center">
                          <p className="text-sm text-gray-500">
                            Tidak ada meja
                          </p>
                        </div>
                      )}
                      {}
                    </div>
                  </div>
                </ChoseTableModal>

                {/* Take Away  Modal */}
                <FormModal
                  isOpen={isTakeAwayModal}
                  onClose={() => setIsTakeAwayModal(false)}
                  handleSubmit={handleSubmitTakeAway}
                  onSubmit={takeAwaySubmit}
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
                  {errorsTakeAway.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorsTakeAway.name.message}
                    </p>
                  )}
                </FormModal>
              </div>
            </div>
            <div className="w-full h-[47%]  border-y border-[#E4E4E4] px-4 ">
              <div className="flex justify-end my-2">
                <button
                  onClick={RemoveAll}
                  className="bg-[#FF57241A] p-1 rounded text-[#EE1616] text-xs flex items-center space-x-1"
                >
                  <Trash className="w-4 h-4" />
                  <p>Hapus Semua</p>
                </button>
              </div>
              <div className="  overflow-y-auto space-y-2 max-h-[85%]">
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
                  handleSubmit={handleSubmitNote}
                  onSubmit={noteSubmit}
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
                  handleSubmit={handleSubmitNotePacket}
                  onSubmit={notePacketSubmit}
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
                    disabled={loading}
                  >
                    {loading ? <LoadingSVG /> : "Buat Pesanan"}
                  </Button>
                </div>
              </form>
              {/* Struk */}
              <div className="none">
                <TableReceipt ref={contentRef} data={orderInvoice} />
              </div>
            </div>
          </div>
        </div>
      </AuthGuardPOS>
    </>
  );
}

export default PosPage;
