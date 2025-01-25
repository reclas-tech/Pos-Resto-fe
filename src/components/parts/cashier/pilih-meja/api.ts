/* eslint-disable react-hooks/rules-of-hooks */
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import Cookies from "js-cookie";
import useSWR from "swr";
import { InvoiceDetailApiResponse } from "./interface";

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

  const postPayment = async (method: "cash" | "debit" | "qris") => {
    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const response = await axiosPrivate.post(
      `/order/cashier/payment/${invoiceId}`,
      { method },
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

export {
  useGetTableList,
  useGetTakeawayList,
  useGetInvoiceDetail,
  usePostPayment,
};
