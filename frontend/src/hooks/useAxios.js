import axiosConfig from "@/lib/configs/axios.config";
import { useCallback, useEffect } from "react";
import useAuth from "./useAuth";

export function useAxios() {
  return useCallback(axiosConfig, []);
}

export function useAxiosSecure() {
  const { user, userData, token, logout } = useAuth();
  const axios = useAxios();

  useEffect(() => {
    axios.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        email: user?.email,
        userId: userData?._id,
      };

      config.headers["Authorization"] = token;
      return config;
    });
  }, [axios, token, user?.email, userData?._id]);

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
