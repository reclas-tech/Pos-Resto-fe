/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import { showAlert2 } from "@/lib/sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { EmployeeOne } from "./interface";
import { EmployeeValues } from "./validation";

// Get Karyawan
const useGetEmployee = (currentPage: number, search: string, limit: number) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/employee/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/employee/admin/list?page=${currentPage}&limit=${limit}&search=${search}`,
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
const useGetEmployeeOne = (slug: string) => {
    const accessToken = Cookies.get("access_token");
    const axiosPrivate = useAxiosPrivateInstance();
  
    const { data, error, mutate, isValidating, isLoading } = useSWR<EmployeeOne>(
      `/employee/admin/detail/${slug}`,
      () =>
        axiosPrivate
          .get(
            `/employee/admin/detail/${slug}`,
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

// Create Karyawan
const postSubmitEmployee = () => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivateInstance();

  const handlePostSubmit = async (
    data: EmployeeValues,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    const accessToken = Cookies.get("access_token");

    try {
      setLoading(true);
      const response = await axiosPrivate.post("/employee/admin/create", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      showAlert2("success", response?.data?.message);
      navigate.push("/karyawan");
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
const putSubmitEmployee = (slug:string) => {
    const navigate = useRouter(); // Pindahkan ke dalam fungsi
    const axiosPrivate = useAxiosPrivateInstance();
  
    const handlePostSubmit = async (
      data: EmployeeValues,
      setLoading: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
      const accessToken = Cookies.get("access_token");
  
      try {
        setLoading(true);
        const response = await axiosPrivate.put(`/employee/admin/edit/${slug}`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        showAlert2("success", response?.data?.message);
        navigate.push("/karyawan");
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

export { postSubmitEmployee, putSubmitEmployee, useGetEmployee, useGetEmployeeOne };

