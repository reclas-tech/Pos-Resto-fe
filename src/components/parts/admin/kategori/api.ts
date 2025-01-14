/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import { showAlert2 } from "@/lib/sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { CategoryValues } from "./validation";
import { CategoryOne } from "./interface";

// Get Category
const useGetCategory = (currentPage: number, search: string, limit: number) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/category/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/category/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
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
const useGetKitchen = (currentPage: number, search: string, limit: number) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `kitchen/admin/get`,
    () =>
      axiosPrivate
        .get(`kitchen/admin/get`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};

// Get one
const useGetCategoryOne = (slug: string) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR<CategoryOne>(
    `/category/admin/detail/${slug}`,
    () =>
      axiosPrivate
        .get(`/category/admin/detail/${slug}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};
//

// Create Kategory
const postSubmitCategory = () => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivateInstance();

  // Menggunakan mutate dari SWR untuk menyegarkan data setelah mutasi
  const handlePostSubmit = async (
    data: CategoryValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    url: string, // URL untuk mutasi dan pemanggilan data
    setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    reset: any
  ) => {
    const accessToken = Cookies.get("access_token");

    try {
      setLoading(true);
      // Melakukan PUT request menggunakan axios
      const response = await axiosPrivate.post(`/category/admin/create`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      showAlert2("success", response?.data?.message);
      navigate.push("/kategori");
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

// Update Kategory
const putSubmitCategory = (id: string) => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivateInstance();

  // Menggunakan mutate dari SWR untuk menyegarkan data setelah mutasi
  const handlePostSubmit = async (
    data: CategoryValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    url: string, // URL untuk mutasi dan pemanggilan data
    setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    reset: any
  ) => {
    const accessToken = Cookies.get("access_token");

    try {
      setLoading(true);
      // Melakukan PUT request menggunakan axios
      const response = await axiosPrivate.put(
        `/category/admin/edit/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      showAlert2("success", response?.data?.message);
      navigate.push("/kategori");
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

export {
  postSubmitCategory,
  putSubmitCategory,
  useGetCategory,
  useGetCategoryOne,
  useGetKitchen,
};
