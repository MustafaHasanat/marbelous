/* eslint-disable @typescript-eslint/no-explicit-any */

export type BottleType = { [key: string]: any };
export type BottleDropType = { en: string; ar: string };

export type InkContextState = {
    bottle: BottleType;
    getBottle: () => Promise<void>;
    locale?: string;
};

export type InkConfig = {
    backendUrl: string;
    locale: string;
    endpoints: {
        getOne: string;
        create: string;
        update: string;
        delete: string;
    };
};
