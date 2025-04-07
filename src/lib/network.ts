import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
    QueryClient,
    QueryKey,
    UseQueryOptions,
    UseMutationOptions,
} from "@tanstack/react-query";
import { publicApi, secureApi, handleApiError } from "./api-client";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 5 * 60 * 1000,
        },
    },
});

type ApiResponse<T> = Promise<T>;

const handleRequest = async <T>(
    apiCall: Promise<AxiosResponse<T>>
): Promise<T> => {
    try {
        const response = await apiCall;
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
};

export const get = <T>(
    url: string,
    secure: boolean = false,
    config?: AxiosRequestConfig
): ApiResponse<T> => {
    const api = secure ? secureApi : publicApi;
    return handleRequest(api.get<T>(url, config));
};

export const post = <T>(
    url: string,
    data?: any,
    secure: boolean = false,
    config?: AxiosRequestConfig
): ApiResponse<T> => {
    const api = secure ? secureApi : publicApi;
    return handleRequest(api.post<T>(url, data, config));
};

export const put = <T>(
    url: string,
    data?: any,
    secure: boolean = false,
    config?: AxiosRequestConfig
): ApiResponse<T> => {
    const api = secure ? secureApi : publicApi;
    return handleRequest(api.put<T>(url, data, config));
};

export const del = <T>(
    url: string,
    secure: boolean = false,
    config?: AxiosRequestConfig
): ApiResponse<T> => {
    const api = secure ? secureApi : publicApi;
    return handleRequest(api.delete<T>(url, config));
};

export const createQueryOptions = <T>(
    key: QueryKey,
    fetcher: () => Promise<T>,
    options?: Omit<UseQueryOptions<T, Error, T, QueryKey>, "queryKey" | "queryFn">
): UseQueryOptions<T, Error, T, QueryKey> => ({
    queryKey: key,
    queryFn: fetcher,
    ...options,
});

export const createMutationOptions = <T, TVariables>(
    mutationFn: (variables: TVariables) => Promise<T>,
    options?: Omit<UseMutationOptions<T, Error, TVariables>, "mutationFn">
): UseMutationOptions<T, Error, TVariables> => ({
    mutationFn,
    ...options,
});