import axios from "axios";

import { router } from "@/router/index.js";
import { userStore } from "@/store/userStore.js";
import type { AxiosError, AxiosResponse } from "axios";
import type { CurrenciesRateList } from "@/pages";

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

type Credentials = { password: string; email: string };
type UserPayload = UserRole & {
  email: string;
  id: string;
};
export type UserRole = {
  role: "client" | "admin";
};
type Users = Array<UserRole>;

api.interceptors.response.use(
  (response) => response,
  /**
   * @param {AxiosError} error
   * @returns
   */
  async (error: AxiosError) => {
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

type SuccesResponse = {
  message: "Utilisateur authentifié";
  status: 201;
};
export interface ErrorResponse {
  message: string;
  status: number;
}

/**
 *
 * @param {Credentials} credentials
 */
export const signIn = async (
  credentials: Credentials,
): Promise<AxiosResponse<{ user: UserRole["role"] }, void>> => {
  await getCsrfToken();
  const response = await api.post("/login", credentials);
  return response;
};

export const isAuthenticated = async () => {
  const response = await api.get<UserRole["role"]>("/user");
  return response.data;
};

export const getAllUsers = async (abortController: AbortController) => {
  const response = await api.get<Users>("/users", { signal: abortController.signal });
  return response.data;
};

export const signOut = async () => {
  const response = await api.get("/logout");
  return response;
};

export const removeUser = async (id: string): Promise<AxiosResponse<SuccesResponse>> => {
  const response = await api.delete<SuccesResponse>(`/users/${id}`);
  return response;
};

export const getUserById = async (
  id: string,
  abortController: AbortController,
): Promise<UserRole> => {
  const response = await api.get<UserRole>(`/users/${id}`, { signal: abortController.signal });
  return response.data;
};

export const updateUserById = async (
  id: string,
  payload: Partial<UserPayload>,
): Promise<AxiosResponse<SuccesResponse>> => {
  const response = await api.patch(`/users/${id}`, payload);
  return response;
};

type UserCreationPayload = {
  role: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const addUser = async (
  payload: UserCreationPayload,
): Promise<AxiosResponse<SuccesResponse>> => {
  const response = await api.post(`/users`, payload);
  return response;
};

type GetCurrencies = Array<{
  id: string;
  crypto_name: string;
  currency_histories: Array<{ id: number; quoting: number; date: string }>;
}>;

export const getCurrencies = async (abortController: AbortController): Promise<any> => {
  const response = await api.get<GetCurrencies>("/currency", { signal: abortController.signal });
  return response.data;
};

/**
 * @returns {Promise<void>}
 */
export const getCurrencyRate = async (
  id: string,
  abortController: AbortController,
): Promise<CurrenciesRateList> => {
  const response = await api.get(`currency/${id}`, { signal: abortController.signal });
  return response.data;
};

type Payload = { quantity: string; currency_histories_id: string };

/**
 * @returns {Promise<AxiosResponse<void>>}
 */
export const purchaseCurrency = async (payload: Payload): Promise<AxiosResponse<void>> => {
  const response = await api.post("/crypto-wallet", payload);
  return response;
};

type GetUsersCryptoWallet = {
  crypto_name: string;
  ch_id: number;
  user_id: number;
  quantity: string;
  capital_gain: null | string;
};

/**
 *
 * @param {AbortController} abortController
 * @returns {Promise<Array<GetUsersCryptoWallet>>}
 */
export const getUsersCryptoWallet = async (
  abortController: AbortController,
): Promise<Array<GetUsersCryptoWallet>> => {
  const response = await api.get("/me", { signal: abortController.signal });
  return response.data;
};

/**
 *
 * @param {string} id
 * @returns {Promise<void>}
 */
export const sellCurrency = async (id: string): Promise<AxiosResponse<SuccesResponse>> => {
  const response = await api.delete<SuccesResponse>(`/crypto-wallet/${id}`);
  return response;
};

/**
 *
 * @param {string} id
 * @param {AbortController} abortController
 * @returns {Promise<void>}
 */
export const getUserCryptoWalletDetail = async (
  id: string,
  abortController: AbortController,
): Promise<void> => {
  const response = await api.get(`me/${id}`, { signal: abortController.signal });
  return response.data;
};

type Wallet = {
  id: string;
  quantity: string;
};

/**
 *
 * @param {AbortController} abortController
 * @returns {Promise<any>}
 */ export const getUserWallet = async (abortController: AbortController): Promise<Wallet> => {
  const response = await api.get<Wallet>("/wallet", { signal: abortController.signal });
  return response.data;
};
