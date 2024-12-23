/* eslint-disable */
import { axiosInstance } from "@/app/utils/axios";
import useLocalStorage from "./useLocalStorage";

export const useRefreshToken = () => {
  const [refreshToken] = useLocalStorage("refreshToken", "");
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

  const refresh = async () => {
    const response = await axiosInstance.post(
      "/auth/admin/refresh-access-token",
      {
        refresh_token: refreshToken,
      }
    );

    setAccessToken(response.data.data.access_token);

    return response.data.data.access_token;
  };

  return refresh;
};
