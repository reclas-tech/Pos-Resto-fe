import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import Cookies from "js-cookie";
import useSWR from "swr";
import { TransaksiOne } from "./interface";
// import { EmployeeOne } from "./interface";

// Get Transaksi
const useGetTransaksi = (currentPage: number, search: string, limit: number) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/transaction/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/transaction/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
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

// Get one
const useGetTransaksiOne = (id: string) => {
    const accessToken = Cookies.get("access_token");
    const axiosPrivate = useAxiosPrivateInstance();
  
    const { data, error, mutate, isValidating, isLoading } = useSWR<TransaksiOne>(
      `/transaction/admin/detail/${id}`,
      () =>
        axiosPrivate
          .get(
            `/transaction/admin/detail/${id}`,
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

export { useGetTransaksi, useGetTransaksiOne };

