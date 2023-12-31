import axios from "axios";

import { router } from "@/router/index.js";
import { userStore } from "@/store/userStore.js";

const { setState } = userStore;

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
 * @typedef {{password:string,email:string,role:string}} Payload
 */

api.interceptors.response.use(
  (response) => response,
  /**
   * @param {AxiosError} error
   * @returns
   */
  async (error) => {
    if (error.response) {
      /**
       * @constant {AxiosError} apiError
       */
      const apiError = error.response.data;

      if (error.response.status === 401 && window.location.pathname !== "/") {
        setState({ user: null });
        await router.navigate({ to: "/" });
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

/**
 *
 * @param {AbortController} abortController
 * @returns {Promise<any>}
 */
export const getAllUsers = async (abortController) => {
  const response = await api.get("/users", { signal: abortController.signal });
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

/**
 * @param {string} id
 * @param {AbortController} abortController
 * @returns {Promise<void>}
 */
export const getUserById = async (id, abortController) => {
  const response = await api.get(`/users/${id}`, { signal: abortController.signal });
  return response.data;
};

/**
 * @param {string} id
 * @param {object} payload
 * @returns {Promise<void>}
 */
export const updateUserById = async (id, payload) => {
  const response = await api.patch(`/users/${id}`, payload);
  return response;
};

/**
 * @param {Payload} payload
 * @returns {Promise<void>}
 */
export const addUser = async (payload) => {
  const response = await api.post(`/users`, payload);
  return response;
};

/**
 *
 * @param {AbortController} abortController
 * @returns {Promise<any>}
 */
export const getCurrencies = async (abortController) => {
  const response = await api.get("/currency", { signal: abortController.signal });
  return response.data;
};

/**
 *
 * @param {string} id
 * @param {AbortController} abortController
 * @returns {Promise<void>}
 */
export const getCurrencyRate = async (id, abortController) => {
  const response = await api.get(`currency/${id}`, { signal: abortController.signal });
  return response.data;
};

/**
 *
 * @param {{quantity:string,currency_id:string}} payload
 * @returns {Promise<void>}
 */
export const purchaseCurrency = async (payload) => {
  const response = await api.post("/crypto-wallet", payload);
  return response;
};

/**
 *
 * @param {AbortController} abortController
 * @returns {Promise<any>}
 */
export const getUsersCryptoWallet = async (abortController) => {
  const response = await api.get("/me", { signal: abortController.signal });
  return response.data;
};

/**
 *
 * @param {string} id
 * @returns {Promise<void>}
 */
export const sellCurrency = async (id) => {
  const response = await api.delete(`/crypto-wallet/${id}`);
  return response;
};

/**
 *
 * @param {string} id
 * @param {AbortController} abortController
 * @returns {Promise<void>}
 */
export const getUserCryptoWalletDetail = async (id, abortController) => {
  const response = await api.get(`me/${id}`, { signal: abortController.signal });
  return response.data;
};

/**
 *
 * @param {AbortController} abortController
 * @returns {Promise<any>}
 */ export const getUserWallet = async (abortController) => {
  const response = await api.get("/wallet", { signal: abortController.signal });
  return response.data;
};
