import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import Cookies from "js-cookie";
import useSWR from "swr";
import { CloseCashierOne } from "./interface";

// Get CloseCashier
const useGetCloseCashier = (currentPage: number, search: string, limit: number) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/cashier-shift/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/cashier-shift/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
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
const useGetCloseCashierOne = (id: string) => {
    const accessToken = Cookies.get("access_token");
    const axiosPrivate = useAxiosPrivateInstance();
  
    const { data, error, mutate, isValidating, isLoading } = useSWR<CloseCashierOne>(
      `/cashier-shift/admin/detail/${id}`,
      () =>
        axiosPrivate
          .get(
            `/cashier-shift/admin/detail/${id}`,
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

export { useGetCloseCashier, useGetCloseCashierOne };

