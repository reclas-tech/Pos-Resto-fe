import { useEffect } from "react";
import Cookies from "js-cookie";
import { axiosPrivateInstance } from "@/utils/axios";

// Hook interceptor
const useAxiosPrivateInstance = () => {
  useEffect(() => {
    // Add interceptor
    const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        // console.log("Access Token", accessToken);
        // console.log("Refresh Token", refreshToken);

        if (accessToken && refreshToken) {
          config.headers["accessToken"] = `Bearer ${accessToken}`;
          config.headers["refreshToken"] = `Bearer ${refreshToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestInterceptor);
    };
  }, []);
  return axiosPrivateInstance;
};

export default useAxiosPrivateInstance;
