import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import NotFound from "@/app/not-found";
import useAxiosPrivateInstance from "./useAxiosPrivateInstance";
import useSWR from "swr";

interface AuthGuardEmployeeProps {
  children: ReactNode;
}

export default function AuthGuardEmployee({ children }: AuthGuardEmployeeProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");
    const role = Cookies.get("role");
    // const cash_on_hand_start = Cookies.get("cash_on_hand_start");
    // const started_at = Cookies.get("started_at");
    // const cashier_id = Cookies.get("cashier_id");
    // const id = Cookies.get("id");
    // const updated_at = Cookies.get("updated_at");
    // const created_at = Cookies.get("created_at");

    // console.log("Access Token:", access_token);
    // console.log("Refresh Token:", refresh_token);
    // console.log("Role:", role);
    // console.log("Cash on Hand Start:", cash_on_hand_start);
    // console.log("Started At:", started_at);
    // console.log("Cashier ID:", cashier_id);
    // console.log("ID:", id);
    // console.log("Updated At:", updated_at);
    // console.log("Created At:", created_at);

    if (!access_token || !refresh_token || !role || role != "cashier") {
      router.push("/login-kasir");
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
    // router.push("/login-kasir")
    console.log("Error 401")
  }

  if (loading) {
    return (
      <>
        <NotFound />
      </>
    );
  }

  return <>{children}</>;
}
