import { envConfig } from "@/config/env-config";
import { selectToken } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";
import { storageUtils } from "@/utils/storage-util";
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from "axios";

// Constants
const API_BASE_URL = envConfig.API_BASE_URL;
const AUTH_STORAGE_KEY = "authState";
const REQUEST_TIMEOUT = 10000;

/**
 * Creates an Axios instance with predefined configuration
 * @param baseURL - The base URL for API requests
 * @returns Configured Axios instance
 */
const createAxiosInstance = (baseURL: string): AxiosInstance => {
    return axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
        timeout: REQUEST_TIMEOUT,
    });
};

// API Instances
export const publicApi = createAxiosInstance(API_BASE_URL);
export const secureApi = createAxiosInstance(API_BASE_URL);

/**
 * Retrieves access token from Redux store or local storage
 * @returns Access token string or null if not found
 */
const getAccessToken = (): string | null => {
    // Check Redux store first
    const storeState = store.getState();
    const storeToken = storeState.auth && selectToken({ auth: storeState.auth });
    if (storeToken) return storeToken;

    // Fallback to local storage
    const authState = storageUtils.get<{ token: string | null }>(AUTH_STORAGE_KEY);
    return authState?.token || null;
};

// Request Interceptor for secureApi
secureApi.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor for secureApi
secureApi.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
        };

        // Handle unauthorized requests
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            storageUtils.remove(AUTH_STORAGE_KEY);
            window.location.href = "/login";
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

/**
 * Handles API errors and throws appropriate error messages
 * @param error - The error object to process
 * @throws Error with descriptive message
 */
export const handleApiError = (error: unknown): never => {
    if (axios.isAxiosError(error)) {
        const serverError = error.response?.data;
        
        if (serverError && 
            typeof serverError === "object" && 
            "message" in serverError
        ) {
            throw new Error(serverError.message as string);
        }
        
        throw new Error(error.message || "An unexpected error occurred");
    }

    if (error instanceof Error) {
        throw error;
    }

    throw new Error("An unknown error occurred");
};