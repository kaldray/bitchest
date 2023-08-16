import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.response.use(
  (response) => response,
  /**
   * @param {AxiosError} error
   * @returns
   */
  (error) => {
    if (error.response) {
      /**
       * @constant {AxiosError} apiError
       */
      const apiError = error.response.data;
      if (error.response.status === 401) {
        return Promise.reject(apiError);
      }
      return Promise.reject(apiError);
    }
    return Promise.reject(error);
  },
);

// export const getCsrfToken = async () => {
//   await axios.get(import.meta.env.VITE_API_BASEURL + "/sanctum/csrf-cookie");
// };
