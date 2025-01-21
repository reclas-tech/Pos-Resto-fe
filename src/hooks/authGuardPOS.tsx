import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import NotFound from "@/app/not-found";

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
    const name = Cookies.get("name");

    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);
    console.log("Role:", role);
    console.log("Nama:", name);

    if (!access_token || !refresh_token || !role) {
      router.push("/login-waiters");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <>
        <NotFound />
      </>
    );
  }

  return <>{children}</>;
}
