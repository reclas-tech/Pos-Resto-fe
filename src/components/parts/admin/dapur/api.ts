/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import { showAlert2 } from "@/lib/sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { KitchenOne } from "./interface";
import { KitchenChackerSchemaValues, KitchenSchemaValues } from "./validation";

// Get Meja
const useGetKitchen = (currentPage: number, search: string, limit: number) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/kitchen/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/kitchen/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
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
const useGetKitchenOne = (slug: string) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR<KitchenOne>(
    `/kitchen/admin/detail/${slug}`,
    () =>
      axiosPrivate
        .get(`/kitchen/admin/detail/${slug}`, {
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
const postSubmitKitchen = () => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivateInstance();

  // Menggunakan mutate dari SWR untuk menyegarkan data setelah mutasi
  const handlePostSubmit = async (
    data: KitchenSchemaValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    url: string, // URL untuk mutasi dan pemanggilan data
    setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    reset: any
  ) => {
    const accessToken = Cookies.get("access_token");

    try {
      setLoading(true);
      // Melakukan PUT request menggunakan axios
      const response = await axiosPrivate.post(`/kitchen/admin/create`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      showAlert2("success", response?.data?.message);
      navigate.push("/dapur");
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
const putSubmitKitchen = (id: string) => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivateInstance();

  // Menggunakan mutate dari SWR untuk menyegarkan data setelah mutasi
  const handlePostSubmit = async (
    data: KitchenSchemaValues,
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
        `/kitchen/admin/edit/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      showAlert2("success", response?.data?.message);
      navigate.push("/dapur");
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

// Get Checker
const useGetChecker = () => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/printer/admin/get`,
    () =>
      axiosPrivate
        .get(`/printer/admin/get`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};

// Update Checker
const putSubmitChecker = () => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivateInstance();

  // Menggunakan mutate dari SWR untuk menyegarkan data setelah mutasi
  const handleEditSubmit = async (
    data: KitchenChackerSchemaValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    url: string, // URL untuk mutasi dan pemanggilan data
    setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    reset: any
  ) => {
    const accessToken = Cookies.get("access_token");

    try {
      setLoading(true);
      // Melakukan PUT request menggunakan axios
      const response = await axiosPrivate.put(`/printer/admin/update`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      showAlert2("success", response?.data?.message);
      navigate.push("/dapur");
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

  return { handleEditSubmit };
};

export {
  postSubmitKitchen,
  putSubmitKitchen,
  useGetKitchen,
  useGetKitchenOne,
  putSubmitChecker,
  useGetChecker,
};
