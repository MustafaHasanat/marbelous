/* eslint-disable @typescript-eslint/no-explicit-any */

import { RadioItemType } from "forms";

export const filterObjectNull = (object: { [key: string]: any }): { [key: string]: any } => {
    const res: { [key: string]: any } = {};

    Object.entries(object).forEach(([key, val]) => {
        if (key) {
            res[key] = val || undefined;
        }
    });

    return res;
};

export function enumToRadioOptions<T extends object>(enumObj: T): RadioItemType[] {
    return Object.values(enumObj)?.map((value) => ({
        value: value,
        label: value,
    }));
}

export const convertObjectToSearchParams = ({ params }: { params: { [key: string]: string } }) => {
    const searchParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
            searchParams.append(key, params[key]);
        }
    });

    return searchParams.toString();
};
