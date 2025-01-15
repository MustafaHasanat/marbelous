/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { FRONTEND_API_BASE } from "@/lib/constants";
import { Session } from "next-auth";
import {
    AxiosAcceptType,
    AxiosContentType,
    AxiosResponseType,
    ListPaginatedResponse,
} from "backend";
import { Locale } from "@/lib/types";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

type AxiosWrapperType<GenericRes> = {
    data: GenericRes;
};

export type AxiosClientProps = {
    endpoint?: string;
    contentType?: AxiosContentType;
    acceptType?: AxiosAcceptType;
    responseType?: AxiosResponseType;
    isToken?: boolean;
    session?: Partial<Session> | null;
    baseURL?: string;
    locale?: Locale;
    backendSubdomain?: string | null;
    timeZone?: Date | string;
    dispatch?: Dispatch<UnknownAction>;
};

class AxiosClient<GenericReq, GenericRes = {}> {
    endpoint: string;
    instance: AxiosInstance;
    headers: Record<string, string>;
    url: string;
    dispatch: Dispatch<UnknownAction> | null;

    constructor({
        endpoint,
        isToken = true,
        contentType = "multipart/form-data",
        acceptType,
        session = null,
        locale = "en",
        baseURL = FRONTEND_API_BASE,
        responseType,
        backendSubdomain = null,
        timeZone,
        dispatch,
    }: AxiosClientProps) {
        const axiosInstance = axios.create({
            baseURL,
        });

        // intercept all outgoing requests and attach a Bearer token to them if the user is signed-in
        axiosInstance.interceptors.request.use((config) => {
            // set the token
            if (isToken) {
                let tokens: { access?: string | undefined; refresh?: string | undefined } = {};

                if (session?.user?.tokens?.access) tokens = session?.user?.tokens;

                tokens?.access && (config.headers["Authorization"] = `Bearer ${tokens.access}`);
            }

            // set the headers
            config.headers["Content-Type"] = contentType;
            config.headers["Accept-Language"] = locale;
            config.headers["Time-Zone"] = timeZone;
            backendSubdomain && (config.headers["BackendSubdomain"] = backendSubdomain);

            acceptType && (config.headers["Accept"] = acceptType);
            responseType && (config.headers["Content-Type"] = responseType);

            return config;
        });

        this.endpoint = endpoint || "";
        this.instance = axiosInstance;
        this.url = baseURL;
        this.headers = {};
        this.dispatch = dispatch || null;
    }

    private combineConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => ({
        ...config,
        headers: { ...this.headers, ...config?.headers },
    });

    /**
     ** The initial state for the url is an empty string (due to applying the subdomain system)
     ** so we need to cancel requests that have an empty string for a url
     *
     * @returns boolean: whether this request should be refused or not
     */
    private isMisdirectedRequest = (): boolean => !this.url || this.url === "";

    getItem = async (config?: AxiosRequestConfig) => {
        if (this.isMisdirectedRequest())
            return {
                data: null,
                status: false,
                error: "Misdirected url",
            } as GenericRes;

        return await this.instance
            .get<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                this.combineConfig(config),
            )
            .then((res) => res.data)
            .catch((res) => {
                // console.error(res);
                return res as GenericRes;
            });
    };

    getList = async (config?: AxiosRequestConfig) => {
        if (this.isMisdirectedRequest())
            return {
                data: [],
                status: false,
                error: "Misdirected url",
            } as GenericRes;

        return await this.instance
            .get<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                this.combineConfig(config),
            )
            .then((res) => res.data)
            .catch((res) => {
                // console.error(res);
                return res?.response?.data as GenericRes;
            });
    };

    getPaginated = async (config?: AxiosRequestConfig) => {
        if (this.isMisdirectedRequest())
            return {
                data: [],
                status: false,
                error: "Misdirected url",
                count: 0,
                next: null,
                previous: null,
            } as ListPaginatedResponse<GenericRes>;

        return await this.instance
            .get<GenericReq, AxiosWrapperType<ListPaginatedResponse<GenericRes>>>(
                this.endpoint,
                this.combineConfig(config),
            )
            .then((res) => res.data)
            .catch((res) => {
                // console.error(res);
                return res?.response?.data as ListPaginatedResponse<GenericRes>;
            });
    };

    post = async (body?: GenericReq, config?: AxiosRequestConfig) =>
        await this.instance
            .post<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                body,
                this.combineConfig(config),
            )
            .then((res) => res.data)
            .catch((res) => {
                // console.error(res);
                return res?.response?.data as GenericRes;
            });

    put = async (body?: GenericReq, config?: AxiosRequestConfig) =>
        await this.instance
            .put<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                body,
                this.combineConfig(config),
            )
            .then((res) => res.data)
            .catch((res) => {
                // console.error(res);
                return res?.response?.data as GenericRes;
            });

    delete = async (config?: AxiosRequestConfig) =>
        await this.instance
            .delete<GenericReq, AxiosWrapperType<GenericRes>>(
                this.endpoint,
                this.combineConfig(config),
            )
            .then((res) => res.data)
            .catch((res) => {
                return res?.response?.data as GenericRes;
            });
}

export default AxiosClient;
