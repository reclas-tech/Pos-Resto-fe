/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import { showAlert2 } from "@/lib/sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { GetOneInvoiceApiResponse, HistoryListApiResponse } from "./interface";

const useGetHistoryList = (
  search: string,
  price: string,
  time: string,
  invoice: string
) => {
  const access_token = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } =
    useSWR<HistoryListApiResponse>(
      `/order/employee/history/list?search=${search}&price=${price}&time=${time}&invoice=${invoice}`,
      () =>
        axiosPrivate
          .get(
            `/order/employee/history/list?search=${search}&price=${price}&time=${time}&invoice=${invoice}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then((res) => res.data)
    );

  return { data, error, mutate, isValidating, isLoading };
};

const useGetOneInvoice = (invoideId: string) => {
  const access_token = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } =
    useSWR<GetOneInvoiceApiResponse | null>(
      invoideId ? `/order/employee/history/detail/${invoideId}` : null,
      () =>
        axiosPrivate
          .get(`/order/employee/history/detail/${invoideId}`, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
          .then((res) => res.data)
          .catch(() => null),
      {
        fallbackData: null,
        revalidateOnFocus: false,
      }
    );

  return { data: data ?? null, error, mutate, isValidating, isLoading };
};

// Update
const putUpdateInvoice = (selectedId: string) => {
  const UseNavigate = useRouter();
  const UseAxiosPrivate = useAxiosPrivateInstance();

  const handlePutSubmit = async (
    data: {
      pin?: string;
      products?: { id: string; quantity: number }[];
      packets?: { id: string; quantity: number }[];
    },
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const access_token = Cookies.get("access_token");
    try {
      setLoading(true);
      const response = await UseAxiosPrivate.put(
        `/order/employee/history/update/${selectedId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      showAlert2("success", response?.data?.message);
      UseNavigate.push("/riwayat-transaksi");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.data?.[0]?.message ||
        error.response?.data?.message ||
        "Gagal mengubah data!";
      showAlert2("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { handlePutSubmit };
};

export { useGetHistoryList, useGetOneInvoice, putUpdateInvoice };
