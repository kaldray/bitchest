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

/**
 * @typedef {{password:string,email:string}} Credentials
 */

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

export const getCsrfToken = async () => {
  await axios.get(import.meta.env.VITE_API_BASEURL + "/sanctum/csrf-cookie");
};

/**
 *
 * @param {Credentials} credentials
 * @returns {Promise<void>}
 */
export const signIn = async (credentials) => {
  await getCsrfToken();
  const response = await api.post("/login", credentials);
  return response;
};

export const isAuthenticated = async () => {
  const response = await api.get("/user");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const signOut = async () => {
  const response = await api.get("/logout");
  return response;
};

/**
 * @param {string} id
 * @returns {Promise<void>}
 */
export const removeUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response;
};
