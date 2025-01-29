import useAxiosPrivateInstance from "@/hooks/useAxiosPrivateInstance";
import Cookies from "js-cookie";
import useSWR from "swr";
import {
  useGetIncomeComparationApiResponse,
  useGetIncomeGraphApiResponse,
  useGetReportApiResponse,
  useGetSummaryApiResponse,
} from "./interface";

// useGetSummary
const useGetSummary = (kitchen: string, start: string, end: string) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  kitchen = kitchen === "Semua" ? "" : kitchen;

  const { data, error, mutate, isValidating, isLoading } =
    useSWR<useGetSummaryApiResponse>(
      `/report/admin/summary/get?kitchen=${kitchen}&start=${start}&end=${end}`,
      () =>
        axiosPrivate
          .get(
            `/report/admin/summary/get?kitchen=${kitchen}&start=${start}&end=${end}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => res.data) // Ensure `res.data` contains the desired data
    );
  console.log("ini data summary", data);

  return { data, error, mutate, isValidating, isLoading };
};

// useGetIncomeGraph
const useGetIncomeGraph = (year: number) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } =
    useSWR<useGetIncomeGraphApiResponse>(
      `/report/admin/income/get?year=${year}`,
      () =>
        axiosPrivate
          .get(`/report/admin/income/get?year=${year}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data) // Ensure `res.data` contains the desired data
    );

  return { data, error, mutate, isValidating, isLoading };
};

// useGetIncomeComparation
const useGetIncomeComparation = (year: number) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } =
    useSWR<useGetIncomeComparationApiResponse>(
      `/report/admin/incomeCompare/get?year=${year}`,
      () =>
        axiosPrivate
          .get(`/report/admin/incomeCompare/get?year=${year}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => res.data) // Ensure `res.data` contains the desired data
    );

  return { data, error, mutate, isValidating, isLoading };
};

// useGetReport
const useGetReport = (
  start: string,
  end: string,
  month: string,
  year: string,
  charity: boolean
) => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } =
    useSWR<useGetReportApiResponse>(
      `/report/admin/get?start=${start}&end=${end}&month=${month}&year=${year}&charity=${
        charity || ""
      }`,
      () =>
        axiosPrivate
          .get(
            `/report/admin/get?start=${start}&end=${end}&month=${month}&year=${year}&charity=${
              charity || ""
            }`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => res.data) // Ensure `res.data` contains the desired data
    );

  return { data, error, mutate, isValidating, isLoading };
};

const useGetKitchen = () => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/kitchen/admin/get`,
    () =>
      axiosPrivate
        .get(`/kitchen/admin/get`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};

const useGetYears = () => {
  const accessToken = Cookies.get("access_token");
  const axiosPrivate = useAxiosPrivateInstance();

  const { data, error, mutate, isValidating, isLoading } = useSWR<number[]>(
    `/order/admin/year/list`,
    () =>
      axiosPrivate
        .get(`/order/admin/year/list`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            return Object.values(res.data.data) as number[]; // Pastikan tipe array number[]
          }
          throw new Error(res.data.message);
        })
  );

  return { data, error, mutate, isValidating, isLoading };
};

export {
  useGetSummary,
  useGetIncomeGraph,
  useGetIncomeComparation,
  useGetReport,
  useGetKitchen,
  useGetYears,
};
