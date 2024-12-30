/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { useRefreshToken } from "./useRefreshToken";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // Import SweetAlert2
import { axiosPrivateInstance } from "@/utils/axios";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");
  const router = useRouter();

  useEffect(() => {
    const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = axiosPrivateInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err?.config;
        if (err?.response?.status === 403 && !originalRequest.sent) {
          originalRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            setAccessToken(newAccessToken);
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axiosPrivateInstance(originalRequest);
          } catch (refreshError) {
            Swal.fire({
              icon: "warning",
              title: "Sesi Berakhir",
              text: "Sesi anda telah berakhir. Silahkan login lagi.",
              confirmButtonText: "Login",
              confirmButtonColor: "#2F55D4",
            }).then(() => {
              localStorage.clear();
              router.push("/login");
            });

            // console.log("Token expired, cleared from localStorage.");
            return Promise.reject(refreshError);
          }
        } else if (err?.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Tidak Memiliki Akses",
            text: "Anda tidak memiliki Akses. Silahkan login lagi.",
            confirmButtonText: "Login",
            confirmButtonColor: "#2F55D4",
          }).then(() => {
            localStorage.clear();
            router.push("/login");
          });
          // console.log("Unauthorized, cleared accessToken.");
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestInterceptor);
      axiosPrivateInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refresh]);

  return axiosPrivateInstance;
};

export default useAxiosPrivate;
