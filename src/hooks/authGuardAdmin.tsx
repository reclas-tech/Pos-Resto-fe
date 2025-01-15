import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import NotFound from "@/app/not-found";

interface AuthGuardAdminProps {
  children: ReactNode;
}

export default function AuthGuardAdmin({ children }: AuthGuardAdminProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");
    // console.log("Access Token:", access_token);
    // console.log("Refresh Token:", refresh_token);
    if (!access_token && !refresh_token) {
      router.push("/login");
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
