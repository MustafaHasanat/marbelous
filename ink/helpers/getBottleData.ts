/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";
import { InkConfig } from "../types";
import { ItemResponse } from "backend";

interface Props {
    config: InkConfig;
    axiosConfig?: AxiosRequestConfig<any>;
}

export async function getBottleData({ config, axiosConfig }: Props) {
    try {
        const response = await axios.request<ItemResponse<any>>({
            method: "get",
            maxBodyLength: Infinity,
            url: `${config.backendUrl}${config.endpoints.getOne}`,
            ...axiosConfig,
        });

        if (!response?.data?.data || response?.status !== 200) return null;

        return response?.data?.data
    } catch (error) {
        console.error(error as string);
        return null;
    }
}
