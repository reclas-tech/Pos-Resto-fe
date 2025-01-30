import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import NotFound from "@/app/not-found";
import useAxiosPrivateInstance from "./useAxiosPrivateInstance";
import useSWR from "swr";

interface AuthGuardAdminProps {
  children: ReactNode;
}

export default function AuthGuardAdmin({ children }: AuthGuardAdminProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");
    const role = Cookies.get("role");
    if (!access_token && !refresh_token) {
      router.push("/login");
      Cookies.remove("role");
    } else {
      setLoading(false);
    }
    if (role) {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("role");
      router.push("/login")
    }
  }, [router]);

  const useAuthAccessTokenExp = () => {
    const accessToken = Cookies.get("access_token");
    const axiosPrivate = useAxiosPrivateInstance();

    const { data, error, mutate, isValidating, isLoading } = useSWR(
      `/auth/admin/profile`,
      () =>
        axiosPrivate
          .get(
            `/auth/admin/profile`,
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
    router.push("/login")
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
