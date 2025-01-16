/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import { showAlert2 } from "@/lib/sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { ProductOne } from "./interface";

// Get Product
const useGetProduct = (currentPage: number, search: string, limit: number) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/product/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/product/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
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
const useGetProductOne = (slug: string) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR<ProductOne>(
    `/product/admin/detail/${slug}`,
    () =>
      axiosPrivate
        .get(`/product/admin/detail/${slug}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};

// Create Product
const postSubmitProduct = () => {
  const navigate = useRouter();
  const axiosPrivate = useAxiosPrivateInstance();

  const handlePostSubmit = async (
    formData: FormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const accessToken = Cookies.get("access_token");

    try {
      setLoading(true);
      const response = await axiosPrivate.post(
        "/product/admin/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showAlert2("success", response?.data?.message);
      navigate.push("/produk");
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

// Update Product
const putSubmitProduct = (slug: string) => {
  const navigate = useRouter();
  const axiosPrivate = useAxiosPrivateInstance();


  const handlePostSubmit = async (
    formData: FormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const accessToken = Cookies.get("access_token");

    try {
      setLoading(true);
      const response = await axiosPrivate.post(
        `/product/admin/edit/${slug}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showAlert2("success", response?.data?.message);
      navigate.push("/produk");
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

export { postSubmitProduct, putSubmitProduct, useGetProduct, useGetProductOne };
