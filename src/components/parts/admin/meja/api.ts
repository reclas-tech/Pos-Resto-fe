/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import { showAlert2 } from "@/lib/sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { TableOne } from "./interface";
import { TableValues } from "./validation";

// Get Meja
const useGetTable = (currentPage: number, search: string, limit: number) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/table/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/table/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
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
const useGetTableOne = (slug: string) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR<TableOne>(
    `/table/admin/detail/${slug}`,
    () =>
      axiosPrivate
        .get(`/table/admin/detail/${slug}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};
//

// Create Karyawan
const postSubmitTable = () => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivateInstance();

  // Menggunakan mutate dari SWR untuk menyegarkan data setelah mutasi
  const handlePostSubmit = async (
    data: TableValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    url: string, // URL untuk mutasi dan pemanggilan data
    setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    reset: any
  ) => {
    const accessToken = Cookies.get("access_token");

    try {
      setLoading(true);
      // Melakukan PUT request menggunakan axios
      const response = await axiosPrivate.post(`/table/admin/create`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      showAlert2("success", response?.data?.message);
      navigate.push("/meja");
      reset(); // Reset formulir
      setIsCreateModalOpen(false);
      // Setelah mutasi berhasil, lakukan mutate untuk menyegarkan data di cache SWR
      mutate(url); // Mutate menggunakan URL untuk menyegarkan data yang diambil menggunakan SWR
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.data?.[0]?.message ||
        error.response?.data?.message ||
        "Gagal menambahkan data!";
      showAlert2("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handlePostSubmit };
};

// Update karyawan
const putSubmitTable = (id: string) => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivateInstance();

  // Menggunakan mutate dari SWR untuk menyegarkan data setelah mutasi
  const handlePostSubmit = async (
    data: TableValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    url: string, // URL untuk mutasi dan pemanggilan data
    setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    reset: any
  ) => {
    const accessToken = Cookies.get("access_token");

    try {
      setLoading(true);
      // Melakukan PUT request menggunakan axios
      const response = await axiosPrivate.put(`/table/admin/edit/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      showAlert2("success", response?.data?.message);
      navigate.push("/meja");
      setIsCreateModalOpen(false);
      reset(); // Reset formulir
      // Setelah mutasi berhasil, lakukan mutate untuk menyegarkan data di cache SWR
      mutate(url); // Mutate menggunakan URL untuk menyegarkan data yang diambil menggunakan SWR
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.data?.[0]?.message ||
        error.response?.data?.message ||
        "Gagal menambahkan data!";
      showAlert2("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handlePostSubmit };
};

export { postSubmitTable, putSubmitTable, useGetTable, useGetTableOne };

