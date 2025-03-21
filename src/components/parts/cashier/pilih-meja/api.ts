/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import Cookies from "js-cookie";
import useSWR from "swr";
import { InvoiceDetailApiResponse } from "./interface";
import { showAlert2 } from "@/lib/sweetalert2";

// Get TableList
const useGetTableList = (status: string) => {
  const accessToken = Cookies.get("access_token");

  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
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

  return { data, error, mutate, isValidating, isLoading };
};

// Get TakeawayList
const useGetTakeawayList = (status: string) => {
  const accessToken = Cookies.get("access_token");

  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/order/cashier/take-away/list?status=${status}`,
    () =>
      axiosPrivate
        .get(`/order/cashier/take-away/list?status=${status}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};

// Get Invoice Detail
const useGetInvoiceDetail = (invoiceId: string) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  // Pastikan accessToken ada sebelum melakukan pemanggilan API
  if (!accessToken) {
    return {
      data: null,
      error: new Error("Access token is missing"),
      isLoading: false,
      isValidating: false,
    };
  }

  const { data, error, mutate, isValidating, isLoading } =
    useSWR<InvoiceDetailApiResponse>(
      invoiceId ? `/order/cashier/detail/${invoiceId}` : null,
      () =>
        axiosPrivate
          .get(`/order/cashier/detail/${invoiceId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data)
    );

  return { data, error, mutate, isValidating, isLoading };
};

// Created Payments
const usePostPayment = (invoiceId: string) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const postPayment = async (
    method: "cash" | "debit" | "qris",
    discount_id: string
  ) => {
    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const requestBody: { method: string; discount_id: string } = { method, discount_id};

    const response = await axiosPrivate.post(
      `/order/cashier/payment/${invoiceId}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };

  return { postPayment };
};

const useTableChange = () => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const changeTable = async (fromTableId: string, toTableIds: string[]) => {
    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    try {
      const response = await axiosPrivate.post(
        "/table/employee/change",
        { from: fromTableId, to: toTableIds },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      showAlert2("success", response?.data?.message);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.data?.[0]?.message ||
        error.response?.data?.message ||
        "Gagal menambahkan data!";
      showAlert2("error", errorMessage);
    }
  };
  return { changeTable };
};

// Get TakeawayList
const useGetDiskonList = () => {
  const accessToken = Cookies.get("access_token");

  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/discount/list`,
    () =>
      axiosPrivate
        .get(`/discount/list`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};

export {
  useGetDiskonList,
  useGetTableList,
  useGetTakeawayList,
  useGetInvoiceDetail,
  usePostPayment,
  useTableChange,
};
