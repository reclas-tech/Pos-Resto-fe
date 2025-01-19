import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import Cookies from "js-cookie";
import useSWR from "swr";
import { DineTakeCount, GrafikIncome, SummaryInterface } from "./interface";

// Get Transaksi
const useGetSummary = () => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR<SummaryInterface>(
    `/dashboard/admin/summary/get`,
    () =>
      axiosPrivate
        .get(
          `/dashboard/admin/summary/get`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};

// Get Dine in Takeaway
const useGetDineTake = () => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR<DineTakeCount>(
    `/dashboard/admin/transaction/get`,
    () =>
      axiosPrivate
        .get(
          `/dashboard/admin/transaction/get`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};

// Get Kitchen
const useGetKitchen = () => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR<DineTakeCount>(
    `/dashboard/admin/kitchen-income/get`,
    () =>
      axiosPrivate
        .get(
          `/dashboard/admin/kitchen-income/get`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};

// Get Grafik income
const useGetGrafikIncome = () => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR<GrafikIncome>(
    `/dashboard/admin/year-income/get`,
    () =>
      axiosPrivate
        .get(
          `/dashboard/admin/year-income/get`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};

export { useGetSummary, useGetDineTake, useGetKitchen, useGetGrafikIncome };

