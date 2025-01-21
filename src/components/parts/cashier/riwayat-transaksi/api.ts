import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import Cookies from "js-cookie";
import useSWR from "swr";

const useGetListCard = (
  search: string,
  price: string,
  time: string,
  invoice: string
) => {
  const access_token = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/order/employee/history/list?search=${search}&price=${price}&time=${time}&invoice=${invoice}`,
    () =>
      axiosPrivate.get(
        `/order/employee/history/list?search=${search}&price=${price}&time=${time}&invoice=${invoice}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      ).then((res) => res.data)
  );

  return { data, error, mutate, isValidating, isLoading };
};

const useGetOneListCard = (id: string) => {
  const access_token = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/order/employee/history/detail/${id}`,
    () =>
      axiosPrivate.get(
        `/order/employee/history/detail/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      ).then((res) => res.data)
  );

  return { data, error, mutate, isValidating, isLoading };
}


export { useGetListCard , useGetOneListCard};