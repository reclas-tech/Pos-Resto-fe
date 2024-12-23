/* eslint-disable */
import useSWR from "swr";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useLocalStorage from "@/hooks/useLocalStorage";

// Get Product Slug
export const useGetProductSlug = (slug: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/get/${slug}`,
    () =>
      axiosPrivate
        .get(`/get/${slug}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res: { data: any }) => res.data)
  );
  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};

// get category slug
export const useGetCategorySlug = (slug: string) => {
  const [accessToken] = useLocalStorage("accessToken", "");
  const axiosPrivate = useAxiosPrivate();
  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/get/${slug}`,
    () =>
      axiosPrivate
        .get(`/get/${slug}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res: { data: any }) => res.data)
  );
  return {
    data,
    error,
    mutate,
    isValidating,
    isLoading,
  };
};
