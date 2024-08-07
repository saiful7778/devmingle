import axiosConfig from "@/lib/configs/axios.config";
import { useCallback, useEffect } from "react";
import useAuth from "./useAuth";

export function useAxios() {
  return useCallback(axiosConfig, []);
}

export function useAxiosSecure() {
  const { logout } = useAuth();
  const axios = useAxios();

  useEffect(() => {
    axios.interceptors.response.use(
      (data) => {
        return data;
      },
      async (err) => {
        try {
          const status = err.response.status;

          if (status === 401 || status === 403) {
            await logout();
          }
        } catch (err) {
          if (err instanceof Error) {
            throw new Error(err.message);
          }
        }
      }
    );
  }, [axios, logout]);

  return axios;
}
