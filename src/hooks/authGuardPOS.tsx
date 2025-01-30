import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import NotFound from "@/app/not-found";
import useAxiosPrivateInstance from "./useAxiosPrivateInstance";
import useSWR from "swr";

interface AuthGuardEmployeeProps {
  children: ReactNode;
}

export default function AuthGuardPOS({ children }: AuthGuardEmployeeProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");
    const role = Cookies.get("role");
    // const name = Cookies.get("name");

    // console.log("Access Token:", access_token);
    // console.log("Refresh Token:", refresh_token);
    // console.log("Role:", role);
    // console.log("Nama:", name);

    if (!access_token || !refresh_token || !role || role != "waiter") {
      router.push("/login-waiters");
    } else {
      setLoading(false);
    }
  }, [router]);

  const useAuthAccessTokenExp = () => {
    const accessToken = Cookies.get("access_token");
    const axiosPrivate = useAxiosPrivateInstance();

    const { data, error, mutate, isValidating, isLoading } = useSWR(
      `/auth/employee/profile`,
      () =>
        axiosPrivate
          .get(
            `/auth/employee/profile`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => res.data)
    );

    return { data, error, mutate, isValidating, isLoading };
  };

  const { error } = useAuthAccessTokenExp();

  if (error?.status === 401) {
    router.push("/login-waiters")
  }

  if (loading) {
    return (
      <>
        <NotFound />
      </>
    );
  }

  return <>{!error && children}</>;
}
