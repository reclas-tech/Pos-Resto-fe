import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import Cookies from "js-cookie";
import useSWR from "swr";
import { UserProfileResponse } from "./interface";

const useGetProfile = () => {
  const access_token = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } =
    useSWR<UserProfileResponse>(`/auth/employee/profile`, () =>
      axiosPrivate
        .get(`/auth/employee/profile`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => res.data)
    );

  return { data, error, mutate, isValidating, isLoading };
};

export { useGetProfile };
