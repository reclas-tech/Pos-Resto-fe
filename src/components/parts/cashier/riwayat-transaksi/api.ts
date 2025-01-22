import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import { showAlert2 } from "@/lib/sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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

const useGetOneListCard = (id: string) => {
  const access_token = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/order/employee/history/detail/${id}`,
    () =>
      axiosPrivate
        .get(`/order/employee/history/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => res.data)
  );

  return { data, error, mutate, isValidating, isLoading };
};

const putRiwayatTransaksi = (id: string) => {
  const UseNavigate = useRouter();
  const UseAxiosPrivate = useAxiosPrivateInstance();

  const handlePutSubmit = async (
    formData: FormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const access_token = Cookies.get("access_token");
    try {
      setLoading(true);
      const response = await UseAxiosPrivate.put(
        `/order/employee/history/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      showAlert2("success", response?.data?.message);
      UseNavigate.push("/riwayat-transaksi");
    } catch (error:any){
      const errorMessage =
        error.response?.data?.data?.[0]?.message ||
        error.response?.data?.message ||
        "Gagal mengubah data!";
      showAlert2("error", errorMessage);
    }finally{
      setLoading(false);
    }
  };
};

export { useGetListCard, useGetOneListCard, putRiwayatTransaksi };
